import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/create-clinic-dto';
import { JwtAuthGuard } from '../auth/utils/guard/jwt-auth.guard';
import { JwtUser } from '../auth/utils/type/auth';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { Roles } from '../auth/utils/enum/role.enum';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { ClinicHook } from './utils/permissions/clinic.hook';
import { toAny } from 'src/utils/toAny';
import { Response } from 'express';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @UseGuards(JwtAuthGuard, AccessGuard)
  @UseAbility(Actions.read, toAny('clinic'))
  @Get()
  async findAll() {
    return this.clinicService.findAll();
  }

  @UseGuards(JwtAuthGuard, AccessGuard)
  @UseAbility(Actions.read, toAny('clinic'), ClinicHook)
  @Get(':clinic_id')
  async findOne(@Param('clinic_id') clinic_id: number) {
    // const user: JwtUser = req.user;
    return this.clinicService.findOne({ clinic_id });
  }

  @UseGuards(JwtAuthGuard, AccessGuard)
  @UseAbility(Actions.create, toAny('clinic'))
  @FormDataRequest({ storage: MemoryStoredFile })
  @Post()
  async create(
    @Body() data: CreateClinicDto,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const user: JwtUser = req.user;
    let customer_id = '';
    if (user.roles[0] === Roles.developer) customer_id = 'TestID';
    if (user.roles[0] === Roles.owner) customer_id = user.id;

    // check clinic is exist
    const clinic = await this.clinicService.findOne({
      owner_id: customer_id,
    });

    if (clinic) {
      return res
        .status(HttpStatus.CONFLICT)
        .send(new ConflictException('Clinic is already exist'))
        .end();
    }
    // TODO: Implement file upload logic

    return this.clinicService.create({
      clinic_name: data.clinic_name,
      clinic_description: data.clinic_description,
      logo_url: 'TestURL',
      customer: {
        connect: {
          customer_id,
        },
      },
    });
  }
}
