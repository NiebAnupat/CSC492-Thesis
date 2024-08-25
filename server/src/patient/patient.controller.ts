import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { isNull } from 'lodash';
import { User } from 'src/auth/common/decorator/user.decorator';
import { Roles } from 'src/auth/common/enum/role.enum';
import { JwtAuthGuard } from 'src/auth/common/guard/jwt-auth.guard';
import { BranchService } from 'src/branch/branch.service';
import { UniqueIdService } from 'src/unique-id/unique-id.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientService } from './patient.service';

@Controller('patient')
@UseGuards(JwtAuthGuard)
export class PatientController {
  private readonly logger = new Logger(PatientController.name);
  constructor(
    private readonly patientService: PatientService,
    private readonly branchService: BranchService,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto, @User() user: any) {
    this.logger.log('Create patient');
    createPatientDto.person_info.edit_by = user.uid;
    const branch = await this.branchService.findOne({
      branch_id: user.branch_id,
    });
    if (isNull(branch)) return NotFoundException;
    const { branch_id, clinic_id } = branch;
    createPatientDto.patient_uid = this.uniqueIdService.getUUID();
    createPatientDto.hn = await this.uniqueIdService.generateHN(
      clinic_id,
      branch_id,
    );
    const { person_info, ...data } = createPatientDto;
    return this.patientService.create({
      branch_id: branch.branch_id,
      data: {
        ...data,
        person_information: {
          create: {
            ...person_info,
            role: Roles.patient,
            edit_by: user.id,
          },
        },
      },
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
