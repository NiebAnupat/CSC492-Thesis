import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
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
  async create(@Body() createPatientDto: CreatePatientDto, @User() user) {
    this.logger.log('Create patient');
    createPatientDto.person_info.edit_by = user.uid;
    const branch = await this.branchService.findOne({
      branch_uid: user.branch_uid,
    });
    if (isNull(branch)) return NotFoundException;
    const { branch_uid, clinic_uid } = branch;
    createPatientDto.patient_uid = this.uniqueIdService.getUUID();
    createPatientDto.hn = await this.uniqueIdService.generateHN(
      clinic_uid,
      branch_uid,
    );
    const { person_info, ...data } = createPatientDto;
    return this.patientService.create({
      branch_uid: branch_uid,
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
