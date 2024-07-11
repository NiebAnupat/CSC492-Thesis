import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { $Enums } from '@prisma/client';
import { Role } from '../auth/utils/decorator/role.decorator';
import { RoleGuard } from '../auth/utils/guard/role.guard';
import { CreateClinicDto } from './dto/create-clinic-dto';
import { JwtAuthGuard } from '../auth/utils/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtUser } from '../auth/utils/type/auth.type';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Role($Enums.roles.developer)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('logo_file'))
  @Post()
  async create(
    @UploadedFile() logo_file: Express.Multer.File,
    @Body() data: CreateClinicDto,
    @Req() req: any,
  ) {
    const user: JwtUser = req.user;
    let customer_id = '';
    if (user.role === $Enums.roles.developer) customer_id = 'TestID';
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
