import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { Role } from '../auth/utils/decorator/role.decorator';
import { RoleGuard } from '../auth/utils/guard/role.guard';
import { CreateClinicDto } from './dto/create-clinic-dto';
import { JwtAuthGuard } from '../auth/utils/guard/jwt-auth.guard';
import { JwtUser } from '../auth/utils/type/auth.type';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { Roles } from 'src/utils/roles/roles.enum';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { ClinicHook } from './utils/permissions/clinic.hook';
import { toAny } from 'src/utils/toAny';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  // @Role(Roles.developer)
  // @UseGuards(JwtAuthGuard, RoleGuard)
  @UseGuards(JwtAuthGuard, AccessGuard)
  @UseAbility(Actions.read, toAny('clinic'))
  @Get()
  async findAll() {
    return this.clinicService.findAll();
  }

  // @Role(Roles.developer, Roles.owner)
  // @UseGuards(JwtAuthGuard, RoleGuard, ClinicGuard)
  @UseGuards(JwtAuthGuard, AccessGuard)
  @UseAbility(Actions.read, toAny('clinic'), ClinicHook)
  @Get(':clinic_id')
  async findOne(@Param('clinic_id') clinic_id: number) {
    // const user: JwtUser = req.user;
    return this.clinicService.findOne(clinic_id);
  }

  @Role(Roles.developer, Roles.owner)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @FormDataRequest({ storage: MemoryStoredFile })
  @Post()
  async create(@Body() data: CreateClinicDto, @Req() req: any) {
    const user: JwtUser = req.user;
    let customer_id = '';
    if (user.roles[0] === Roles.developer) customer_id = 'TestID';
    if (user.roles[0] === Roles.owner) customer_id = user.id;

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
