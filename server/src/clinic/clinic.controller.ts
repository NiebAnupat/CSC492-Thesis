import {
  Body,
  ConflictException,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/create-clinic-dto';
import { JwtAuthGuard } from '../auth/common/guard/jwt-auth.guard';
import { JwtUser } from '../auth/common/type/auth';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { Roles } from '../auth/common/enum/role.enum';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { toAny } from 'src/utils/toAny';
import { Response } from 'express';
import { UploadLogoDto } from './dto/upload-logo-dto';
import { FileStorageService } from '../file-storage/file-storage.service';
import { clinic } from '@prisma/client';
import { GetClinicHook } from './common/permissions/hooks/clinic.get.hook';
import { PostClinicHook } from './common/permissions/hooks/clinic.post.hook';
import { DeleteClinicHook } from './common/permissions/hooks/clinic.delete.hook';

@UseGuards(JwtAuthGuard, AccessGuard)
@Controller('clinic')
export class ClinicController {
  constructor(
    private readonly clinicService: ClinicService,
    private readonly fileStorageService: FileStorageService,
  ) {}

  @UseAbility(Actions.update, toAny('clinic'), PostClinicHook)
  @FormDataRequest({ storage: MemoryStoredFile })
  @Post('logo')
  async uploadLogo(
    @Body() data: UploadLogoDto,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const user: JwtUser = req.user;
    const user_clinic = await this.clinicService.findOne({
      owner_id: user.id,
    });
    if (!user_clinic) {
      return new ConflictException('Clinic is not exist');
    }
    const file = data.logo_file;
    const newFileNeame = `${user.id}_clinic_logo_${file.originalName}`;
    try {
      await this.fileStorageService.uploadFile(file, newFileNeame);
      await this.clinicService.update({
        where: { clinic_id: user_clinic.clinic_id },
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

  @UseAbility(Actions.read, toAny('clinic'), GetClinicHook)
  @Get('logo')
  async getLogo(@Req() req: any, @Res() res: Response) {
    try {
      const user: JwtUser = req.user as JwtUser;
      let clinic: clinic;
      switch (user.roles[0]) {
        case Roles.owner:
          clinic = await this.clinicService.findOne({ owner_id: user.id });
          break;
        case Roles.developer:
          clinic = await this.clinicService.findOne({ owner_id: 'TestID' });
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

  @UseAbility(Actions.read, toAny('clinic'), GetClinicHook)
  @Get()
  async findAll() {
    return this.clinicService.findAll();
  }


  // TODO: Make get clinic from user_id for each role
  @UseAbility(Actions.read, toAny('clinic'), GetClinicHook)
  @Get(':clinic_id')
  async findOne(
    @Param('clinic_id', new DefaultValuePipe(0), ParseIntPipe)
    clinic_id: number,
  ) {
    const clinic = await this.clinicService.findOne({ clinic_id });
    if (!clinic) return new ConflictException('Clinic is not exist');
    return clinic;
  }

  @UseAbility(Actions.create, toAny('clinic'))
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

    const created_clinic = await this.clinicService.create({
      clinic_name_en: data.clinic_name_en,
      clinic_name_th: data.clinic_name_th,
      clinic_initial: data.clinic_initial,
      clinic_description: data.clinic_description,
      logo_filename: 'default_clinic_logo.png',
      customer: {
        connect: {
          customer_id,
        },
      },
    });

    return res.status(HttpStatus.CREATED).json(created_clinic).end();
  }

  @UseAbility(Actions.delete, toAny('clinic'), DeleteClinicHook)
  @Delete()
  async remove(@Req() req: any) {
    const user: JwtUser = req.user;
    const { clinic_id } = await this.getClinicID(user.id);
    return this.clinicService.delete({ clinic_id });
  }

  private async getClinicID(owner_id: string): Promise<{ clinic_id: number }> {
    const clinic = await this.clinicService.findOne({ owner_id });
    if (!clinic) {
      throw new ConflictException('Clinic is not exist');
    }
    return { clinic_id: clinic.clinic_id };
  }
}
