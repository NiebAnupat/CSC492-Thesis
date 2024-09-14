import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { DateTime } from 'luxon';
import { PrismaService } from 'nestjs-prisma';
import { BranchService } from 'src/branch/branch.service';
import { PatientDto } from './dto/patient.dto';

@Injectable()
export class PatientService {
  private readonly logger = new Logger(PatientService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly branchService: BranchService,
  ) {}

  async create({
    branch_uid,
    data,
  }: {
    branch_uid: string;
    data: Prisma.patientCreateInput;
  }): Promise<PatientDto> {
    const actionName = this.create.name;
    const startDate = DateTime.utc();
    this.logger.debug(`[${actionName}] - Start - At: ${startDate}`);

    const isExist = await this.checkPatientExist(
      branch_uid,
      data.person_information.create.citizen_id,
    );
    if (isExist) {
      throw new BadRequestException('Patient Citizen ID is already exist');
    }

    const newPatient = await this.prisma.patient.create({
      data: {
        ...data,
        branch: {
          connect: {
            branch_uid,
          },
        },
      },
      include: {
        person_information: true,
      },
    });

    if (!newPatient) {
      throw new BadRequestException('Failed to create patient');
    }

    const patientDto = plainToInstance(PatientDto, newPatient);
    const endDate = DateTime.utc();
    this.logger.log(`[${actionName}] - Success - At: ${endDate}`);
    return patientDto;
  }

  async findAll(skip: number, take: number): Promise<PatientDto[]> {
    const actionName = this.findAll.name;
    const startDate = DateTime.utc();
    this.logger.debug(`[${actionName}] - Start - At: ${startDate}`);

    const patients = await this.prisma.patient.findMany({
      skip,
      take,
    });

    if (!patients.length) {
      throw new NotFoundException('No patients found');
    }

    const patientDtos = plainToInstance(PatientDto, patients);
    const endDate = DateTime.utc();
    this.logger.log(`[${actionName}] - Success - At: ${endDate}`);
    return patientDtos;
  }

  async findBranchPatients(
    branch_uid: string,
    skip: number,
    take: number,
  ): Promise<PatientDto[]> {
    const actionName = this.findBranchPatients.name;
    const startDate = DateTime.utc();
    this.logger.debug(`[${actionName}] - Start - At: ${startDate}`);

    const patients = await this.prisma.patient.findMany({
      where: { branch_uid },
      include: { person_information: true },
      skip,
      take,
    });

    if (!patients.length) {
      throw new NotFoundException('No patients found for this branch');
    }

    const patientDtos = plainToInstance(PatientDto, patients);
    const endDate = DateTime.utc();
    this.logger.log(`[${actionName}] - Success - At: ${endDate}`);
    return patientDtos;
  }

  async findCount(where: Prisma.patientWhereInput): Promise<number> {
    const actionName = this.findCount.name;
    const startDate = DateTime.utc();
    this.logger.debug(`[${actionName}] - Start - At: ${startDate}`);

    const count = await this.prisma.patient.count({ where });

    const endDate = DateTime.utc();
    this.logger.log(`[${actionName}] - Success - At: ${endDate}`);
    return count;
  }

  async findOne(where: Prisma.patientWhereUniqueInput): Promise<PatientDto> {
    const actionName = this.findOne.name;
    const startDate = DateTime.utc();
    this.logger.debug(`[${actionName}] - Start - At: ${startDate}`);

    const patient = await this.prisma.patient.findUnique({ where });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const patientDto = plainToInstance(PatientDto, patient);
    const endDate = DateTime.utc();
    this.logger.log(`[${actionName}] - Success - At: ${endDate}`);
    return patientDto;
  }

  async update(
    where: Prisma.patientWhereUniqueInput,
    data: Prisma.patientUpdateInput,
  ): Promise<PatientDto> {
    const actionName = this.update.name;
    const startDate = DateTime.utc();
    this.logger.debug(`[${actionName}] - Start - At: ${startDate}`);

    const updatedPatient = await this.prisma.patient.update({
      where,
      data,
    });

    if (!updatedPatient) {
      throw new BadRequestException('Failed to update patient');
    }

    // TODO : Change Update Patient Response Dto
    const patientDto = plainToInstance(PatientDto, updatedPatient);
    const endDate = DateTime.utc();
    this.logger.log(`[${actionName}] - Success - At: ${endDate}`);
    return patientDto;
  }

  async remove(where: Prisma.patientWhereUniqueInput): Promise<PatientDto> {
    const actionName = this.remove.name;
    const startDate = DateTime.utc();
    this.logger.debug(`[${actionName}] - Start - At: ${startDate}`);

    // Soft delete patient
    const removedPatient = await this.prisma.patient.update({
      where,
      data: {
        person_information: {
          update: {
            deleted_at: DateTime.utc().toSQLDate(),
          },
        },
      },
    });

    if (!removedPatient) {
      throw new BadRequestException('Failed to remove patient');
    }

    const patientDto = plainToInstance(PatientDto, removedPatient);
    const endDate = DateTime.utc();
    this.logger.log(`[${actionName}] - Success - At: ${endDate}`);
    return patientDto;
  }

  async checkPatientExist(
    branch_uid: string,
    citizen_id: string,
  ): Promise<boolean> {
    const actionName = this.checkPatientExist.name;
    const startDate = DateTime.utc();
    this.logger.debug(`[${actionName}] - Start - At: ${startDate}`);

    const exists = !!(await this.branchService.findFirst({
      branch_uid,
      deleted_at: null,
      patient: {
        some: {
          person_information: {
            citizen_id,
            deleted_at: null,
          },
        },
      },
    }));

    const endDate = DateTime.utc();
    this.logger.log(`[${actionName}] - Completed - At: ${endDate}`);
    return exists;
  }
}
