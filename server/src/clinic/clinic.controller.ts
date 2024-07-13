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
import { $Enums } from '@prisma/client';
import { Role } from '../auth/utils/decorator/role.decorator';
import { RoleGuard } from '../auth/utils/guard/role.guard';
import { CreateClinicDto } from './dto/create-clinic-dto';
import { JwtAuthGuard } from '../auth/utils/guard/jwt-auth.guard';
import { JwtUser } from '../auth/utils/type/auth.type';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { ClinicGuard } from './utils/guard/clinic.guard';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Role($Enums.roles.developer)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findAll() {
    return this.clinicService.findAll();
  }

  @Role($Enums.roles.developer, $Enums.roles.owner)
  @UseGuards(JwtAuthGuard, RoleGuard, ClinicGuard)
  @Get(':clinic_id')
  async findOne(@Param('clinic_id') clinic_id: number, @Req() req: any) {
    // const user: JwtUser = req.user;
    return this.clinicService.findOne(clinic_id);
  }

  @Role($Enums.roles.developer, $Enums.roles.owner)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @FormDataRequest({ storage: MemoryStoredFile })
  @Post()
  async create(@Body() data: CreateClinicDto, @Req() req: any) {
    const user: JwtUser = req.user;
    let customer_id = '';
    if (user.role === $Enums.roles.developer) customer_id = 'TestID';
    if (user.role === $Enums.roles.owner) customer_id = user.user_id;

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
