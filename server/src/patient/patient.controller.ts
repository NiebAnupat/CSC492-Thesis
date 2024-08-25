import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { JwtUser } from 'src/auth/common/type/auth';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  private readonly logger = new Logger(PatientController.name);
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto, @Req() req: any) {
    this.logger.log('Create patient');
    const user: JwtUser = req.user as JwtUser;
    createPatientDto.person_info.edit_by = user.uid;
    const { branch_id, ...data } = createPatientDto;

    return this.patientService.create({
      branch_id,
      data,
    });
  }

  @Get()
  findAll() {
    this.logger.log('FindAll patient');
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne() {
    this.logger.log('FindOne patient');
    throw new Error('Method not implemented.');
  }

  @Patch(':id')
  update() {
    this.logger.log('Update patient');
    throw new Error('Method not implemented.');
  }

  @Delete(':id')
  remove() {
    this.logger.log('Remove patient');
    throw new Error('Method not implemented.');
  }
}
