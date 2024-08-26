import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { clinic } from '@prisma/client';
import { Response } from 'express';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { User } from 'src/auth/common/decorator/user.decorator';
import { toAny } from 'src/utils/toAny';
import { Roles } from '../auth/common/enum/role.enum';
import { JwtAuthGuard } from '../auth/common/guard/jwt-auth.guard';
import { JwtUser } from '../auth/common/type/auth';
import { FileStorageService } from '../file-storage/file-storage.service';
import { ClinicService } from './clinic.service';
import { ClinicHook } from './common/permissions/clinic.hook';
import { CreateClinicDto } from './dto/create-clinic-dto';
import { UploadLogoDto } from './dto/upload-logo-dto';

@UseGuards(JwtAuthGuard, AccessGuard)
@Controller('clinic')
export class ClinicController {
  constructor(
    private readonly clinicService: ClinicService,
    private readonly fileStorageService: FileStorageService,
  ) {}

  @UseAbility(Actions.update, toAny('clinic'), ClinicHook)
  @FormDataRequest({ storage: MemoryStoredFile })
  @Post('logo')
  async uploadLogo(
    @Body() data: UploadLogoDto,
    @Req() req: any,
    @Res() res: Response,
    @User() user,
  ) {
    const user_clinic = await this.clinicService.findOne({
      owner_uid: user.id,
    });
    if (!user_clinic) {
      return new ConflictException('Clinic is not exist');
    }
    const file = data.logo_file;
    const newFileNeame = `${user.id}_clinic_logo_${file.originalName}`;
    try {
      await this.fileStorageService.uploadFile(file, newFileNeame);
      await this.clinicService.update({
        where: { clinic_uid: user_clinic.clinic_uid },
        data: { logo_filename: newFileNeame },
      });
      res
        .status(HttpStatus.CREATED)
        .json({ logo_filename: newFileNeame })
        .end();
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
    }
  }

  @UseAbility(Actions.read, toAny('clinic'), ClinicHook)
  @Get('logo')
  async getLogo(@Req() req: any, @Res() res: Response) {
    try {
      const user: JwtUser = req.user as JwtUser;
      let clinic: clinic;
      switch (user.roles[0]) {
        case Roles.owner:
          clinic = await this.clinicService.findOne({ owner_uid: user.id });
          break;
        case Roles.developer:
          clinic = await this.clinicService.findOne({ owner_uid: 'TestID' });
          break;
        default:
          break;
      }

      const { Body, Metadata } = await this.fileStorageService.getFile(
        clinic.logo_filename,
      );
      res
        .writeHead(HttpStatus.OK, {
          'Content-Type': Metadata.ContentType,
          'Content-Length': Metadata.ContentLength,
          'Content-Disposition': 'inline',
          // 'Content-Disposition': 'attachment; filename=' + logo_filename,
        })
        .end(Body);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
    }
  }

  @UseAbility(Actions.read, toAny('clinic'), ClinicHook)
  @Get()
  async findAll() {
    return this.clinicService.findAll();
  }

  // TODO: Make get clinic from user_id for each role
  @UseAbility(Actions.read, toAny('clinic'), ClinicHook)
  @Get(':clinic_uid')
  async findOne(
    @Param('clinic_uid', ParseUUIDPipe)
    clinic_uid: string,
  ) {
    const clinic = await this.clinicService.findOne({ clinic_uid });
    if (!clinic) return new ConflictException('Clinic is not exist');
    return clinic;
  }

  @UseAbility(Actions.create, toAny('clinic'))
  @Post()
  async create(
    @Body() data: CreateClinicDto,
    @Req() req: any,
    @Res() res: Response,
    @User() user,
  ) {
    let customer_uid = '';
    if (user.roles[0] === Roles.developer) customer_uid = 'TestID';
    else if (user.roles[0] === Roles.owner) customer_uid = user.id;

    // check clinic is exist
    const clinic = await this.clinicService.findOne({
      owner_uid: customer_uid,
    });

    if (clinic) {
      return res
        .status(HttpStatus.CONFLICT)
        .send(new ConflictException('Clinic is already exist'))
        .end();
    }

    const created_clinic = await this.clinicService.create({
      clinic_name_en: data.clinic_name_en,
      clinic_name_th: data.clinic_name_th,
      clinic_initial: data.clinic_initial,
      clinic_description: data.clinic_description,
      logo_filename: 'default_clinic_logo.png',
      customer: {
        connect: {
          customer_uid,
        },
      },
    });

    return res.status(HttpStatus.CREATED).json(created_clinic).end();
  }

  @UseAbility(Actions.delete, toAny('clinic'), ClinicHook)
  @Delete()
  async remove(@Req() req: any) {
    const user: JwtUser = req.user;
    const { clinic_uid } = await this.getClinicID(user.id);
    return this.clinicService.delete({ clinic_uid });
  }

  private async getClinicID(
    owner_uid: string,
  ): Promise<{ clinic_uid: string }> {
    const clinic = await this.clinicService.findOne({ owner_uid });
    if (!clinic) {
      throw new ConflictException('Clinic is not exist');
    }
    return { clinic_uid: clinic.clinic_uid };
  }
}
