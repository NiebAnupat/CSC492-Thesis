import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
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
import { InjectS3, S3 } from 'nestjs-s3';
import { ConfigService } from '@nestjs/config';
import { AWSConfig } from 'src/config/config.interface';
import { ConfigKey } from 'src/config/config.enum';
import { UploadLogoDto } from './dto/upload-logo-dto';
import { GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { log } from 'console';

@Controller('clinic')
export class ClinicController {
  constructor(
    @InjectS3() private readonly s3: S3,
    private readonly configService: ConfigService,
    private readonly clinicService: ClinicService,
  ) {}

  // @UseGuards(JwtAuthGuard, AccessGuard)
  // @UseAbility(Actions.read, toAny('clinic'), ClinicHook)
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

    const created_clinic = await this.clinicService.create({
      clinic_name: data.clinic_name,
      clinic_description: data.clinic_description,
      logo_url: 'default_logo.png',
      customer: {
        connect: {
          customer_id,
        },
      },
    });

    return res.status(HttpStatus.CREATED).json(created_clinic).end();
  }

  @UseGuards(JwtAuthGuard, AccessGuard)
  @UseAbility(Actions.update, toAny('clinic'), ClinicHook)
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
    const awsConfig: AWSConfig = this.configService.get<AWSConfig>(
      ConfigKey.AWS,
    );
    const file = data.logo_file;
    const newFileNeame = `${user.id}_clinic_logo_${file.originalName}`;
    try {
      await this.s3.putObject({
        Bucket: awsConfig.bucketName,
        Key: newFileNeame,
        Body: file.buffer,
        Metadata: {
          'Content-Type': file.mimeType,
          length: file.size.toString(),
        },
      });
      res
        .status(HttpStatus.CREATED)
        .json({ logo_filename: newFileNeame })
        .end();
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(new InternalServerErrorException('Upload file failed'))
        .end();
    }
  }

  // get logo file
  @Get('logo/:logo_filename')
  async getLogo(
    @Param('logo_filename') logo_filename: string,
    @Res() res: Response,
  ) {
    const awsConfig: AWSConfig = this.configService.get<AWSConfig>(
      ConfigKey.AWS,
    );
    try {
      const result: GetObjectCommandOutput = await this.s3.getObject({
        Bucket: awsConfig.bucketName,
        Key: logo_filename,
      });

      const { Body, Metadata } = result;
      res
        .writeHead(HttpStatus.OK, {
          'Content-Type': Metadata['content-type'],
          'Content-Length': Metadata.length,
          'Content-Disposition': 'inline',
          // 'Content-Disposition': 'attachment; filename=' + logo_filename,
        })
        .end(await Body.transformToByteArray());
    } catch (error) {
      log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard, AccessGuard)
  @UseAbility(Actions.delete, toAny('clinic'), ClinicHook)
  @Delete()
  async remove(@Req() req: any) {
    const user: JwtUser = req.user;
    const user_clinic = await this.clinicService.findOne({
      owner_id: user.id,
    });
    if (!user_clinic) {
      return new ConflictException('Clinic is not exist');
    }
    const { clinic_id } = user_clinic;
    return this.clinicService.delete({ clinic_id });
  }
}
