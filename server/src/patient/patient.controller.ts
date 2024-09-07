import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { isNull } from 'lodash';
import { DateTime } from 'luxon';
import { User } from 'src/auth/common/decorator/user.decorator';
import { Roles } from 'src/auth/common/enum/role.enum';
import { JwtAuthGuard } from 'src/auth/common/guard/jwt-auth.guard';
import { BranchService } from 'src/branch/branch.service';
import { ServiceResponse } from 'src/common/dto/service.response';
import { UniqueIdService } from 'src/unique-id/unique-id.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientDto } from './dto/patient.dto';
import { UpdateRequestPatientDto } from './dto/update-patient.dto';
import { PatientService } from './patient.service';

@ApiTags('Patient')
@Controller('patient')
@UseGuards(JwtAuthGuard)
export class PatientController {
  private readonly logger = new Logger(PatientController.name);
  constructor(
    private readonly patientService: PatientService,
    private readonly branchService: BranchService,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  @ApiCreatedResponse({ type: ServiceResponse<PatientDto> })
  @Post()
  async create(
    @Body() createPatientDto: CreatePatientDto,
    @User() user,
  ): Promise<ServiceResponse<PatientDto>> {
    const actionName = this.create.name;
    const startDate = DateTime.utc
    this.logger.debug(`[${actionName}] - Start - At : ${startDate}`);
    createPatientDto.person_info.edit_by = user.uid;
    const branch = await this.branchService.findOne({
      branch_uid: user.branch_uid,
    });
    if (isNull(branch)) return ServiceResponse.notFound();
    const { branch_uid, clinic_uid } = branch;
    createPatientDto.patient_uid = this.uniqueIdService.getUUID();
    createPatientDto.hn = await this.uniqueIdService.generateHN(
      clinic_uid,
      branch_uid,
    );
    const { person_info, ...data } = createPatientDto;
    const newPatient = await this.patientService.create({
      branch_uid,
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

    const endDate = DateTime.utc
    this.logger.debug(`[${actionName}] - Success - At : ${endDate}`);
    const patientDto = plainToInstance(PatientDto, newPatient);
    return ServiceResponse.success(patientDto);
  }

  @Get()
  findAll(
    @Query('skip', ParseIntPipe) skip = 0,
    @Query('take', ParseIntPipe) take = 10,
    @User() user,
  ) {
    this.logger.log(
      `FindAll patients with pagination for branch_uid : ${user.branch_uid}`,
    );
    return this.patientService.findBranchPatients(user.branch_uid, skip, take);
  }

  @Get(':patient_uid')
  findOne(@Param('patient_uid', ParseUUIDPipe) patient_uid: string) {
    this.logger.log('FindOne');
    return this.patientService.findOne({ patient_uid });
  }

  @Get('branch/:branch_uid')
  findBranchPatients(
    @Param('branch_uid', ParseUUIDPipe) branch_uid: string,
    @Query('skip', ParseIntPipe) skip = 0,
    @Query('take', ParseIntPipe) take = 10,
  ) {
    return this.patientService.findBranchPatients(branch_uid, skip, take);
  }

  @Patch(':patient_uid')
  async update(
    @Param('patient_uid', ParseUUIDPipe) patient_uid: string,
    @Body() updatePatientDto: UpdateRequestPatientDto,
    @User() user,
  ): Promise<ServiceResponse<PatientDto>> {
    const actionName = this.update.name;
    const startDate = DateTime.utc
    this.logger.debug(`[${actionName}] - Start - At : ${startDate}`);

    // Retrieve the patient based on patient_uid
    const existingPatient = await this.patientService.findOne({ patient_uid });
    if (isNull(existingPatient)) return ServiceResponse.notFound();

    // Update the patient information with the incoming data
    updatePatientDto.person_info.edit_by = user.uid;

    const updatedPatient = await this.patientService.update(
      { patient_uid },
      {
        ...updatePatientDto,
        person_information: {
          update: {
            ...updatePatientDto.person_info,
            role: Roles.patient,
            edit_by: user.uid,
          },
        },
      },
    );

    const endDate = DateTime.utc
    this.logger.debug(`[${actionName}] - Success - At : ${endDate}`);

    const patientDto = plainToInstance(PatientDto, updatedPatient);
    return ServiceResponse.success(patientDto);
  }

  @Delete(':id')
  remove() {
    this.logger.log('Remove patient');
    throw new Error('Method not implemented.');
  }
}
