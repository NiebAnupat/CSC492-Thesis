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
    const startDate = DateTime.utc();
    this.logger.debug(`[${actionName}] - Start - At: ${startDate}`);

    createPatientDto.person_info.edit_by = user.uid;
    const branch = await this.branchService.findOne({
      branch_uid: user.branch_uid,
    });
    if (isNull(branch)) {
      this.logger.warn(`[${actionName}] - Branch not found`);
      return ServiceResponse.notFound();
    }

    const { branch_uid, clinic_uid } = branch;
    createPatientDto.patient_uid = this.uniqueIdService.getUUID();
    createPatientDto.hn = await this.uniqueIdService.generateHN(
      clinic_uid,
      branch_uid,
    );

    const { person_info, ...data } = createPatientDto;
    const patientDto = await this.patientService.create({
      branch_uid,
      data: {
        ...data,
        person_information: {
          create: {
            ...person_info,
            role: Roles.patient,
            edit_by: user.uid,
          },
        },
      },
    });

    const endDate = DateTime.utc();
    this.logger.log(`[${actionName}] - Success - At: ${endDate}`);
    return ServiceResponse.success(patientDto);
  }

  @Get()
  async findAll(
    @Query('skip', ParseIntPipe) skip = 0,
    @Query('take', ParseIntPipe) take = 10,
    @User() user,
  ): Promise<ServiceResponse<PatientDto[]>> {
    const actionName = this.findAll.name;
    const startDate = DateTime.utc();
    this.logger.debug(`[${actionName}] - Start - At: ${startDate}`);

    const patients = await this.patientService.findBranchPatients(
      user.branch_uid,
      skip,
      take,
    );

    if (!patients.length) {
      this.logger.warn(
        `[${actionName}] - No patients found for branch_uid: ${user.branch_uid}`,
      );
      return ServiceResponse.notFound();
    }

    const patientDtos = plainToInstance(PatientDto, patients);
    const endDate = DateTime.utc();
    this.logger.log(`[${actionName}] - Success - At: ${endDate}`);
    return ServiceResponse.success(patientDtos);
  }

  @Get(':patient_uid')
  async findOne(
    @Param('patient_uid', ParseUUIDPipe) patient_uid: string,
  ): Promise<ServiceResponse<PatientDto>> {
    const actionName = this.findOne.name;
    const startDate = DateTime.utc();
    this.logger.debug(`[${actionName}] - Start - At: ${startDate}`);

    const patient = await this.patientService.findOne({ patient_uid });

    if (isNull(patient)) {
      this.logger.warn(`[${actionName}] - Patient not found: ${patient_uid}`);
      return ServiceResponse.notFound();
    }

    const patientDto = plainToInstance(PatientDto, patient);
    const endDate = DateTime.utc();
    this.logger.log(`[${actionName}] - Success - At: ${endDate}`);
    return ServiceResponse.success(patientDto);
  }

  @Get('branch/:branch_uid')
  async findBranchPatients(
    @Param('branch_uid', ParseUUIDPipe) branch_uid: string,
    @Query('skip', ParseIntPipe) skip = 0,
    @Query('take', ParseIntPipe) take = 10,
  ): Promise<ServiceResponse<PatientDto[]>> {
    const actionName = this.findBranchPatients.name;
    const startDate = DateTime.utc();
    this.logger.debug(`[${actionName}] - Start - At: ${startDate}`);

    const patients = await this.patientService.findBranchPatients(
      branch_uid,
      skip,
      take,
    );

    if (!patients.length) {
      this.logger.warn(
        `[${actionName}] - No patients found for branch_uid: ${branch_uid}`,
      );
      return ServiceResponse.notFound();
    }

    const patientDtos = plainToInstance(PatientDto, patients);
    const endDate = DateTime.utc();
    this.logger.log(`[${actionName}] - Success - At: ${endDate}`);
    return ServiceResponse.success(patientDtos);
  }

  @Patch(':patient_uid')
  async update(
    @Param('patient_uid', ParseUUIDPipe) patient_uid: string,
    @Body() updatePatientDto: UpdateRequestPatientDto,
    @User() user,
  ): Promise<ServiceResponse<PatientDto>> {
    const actionName = this.update.name;
    const startDate = DateTime.utc();
    this.logger.debug(`[${actionName}] - Start - At: ${startDate}`);

    const existingPatient = await this.patientService.findOne({ patient_uid });
    if (isNull(existingPatient)) {
      this.logger.warn(`[${actionName}] - Patient not found: ${patient_uid}`);
      return ServiceResponse.notFound();
    }

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

    const patientDto = plainToInstance(PatientDto, updatedPatient);
    const endDate = DateTime.utc();
    this.logger.log(`[${actionName}] - Success - At: ${endDate}`);
    return ServiceResponse.success(patientDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ServiceResponse<void>> {
    const actionName = this.remove.name;
    const startDate = DateTime.utc();
    this.logger.debug(`[${actionName}] - Start - At: ${startDate}`);

    try {
      await this.patientService.remove({ patient_uid: id });
      const endDate = DateTime.utc();
      this.logger.log(`[${actionName}] - Success - At: ${endDate}`);
      return ServiceResponse.success();
    } catch (error) {
      this.logger.error(`[${actionName}] - Error: ${error.message}`);
      return ServiceResponse.internalServerError(error.message);
    }
  }
}
