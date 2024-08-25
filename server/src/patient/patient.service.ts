import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { BranchService } from 'src/branch/branch.service';

@Injectable()
export class PatientService {
  private readonly logger = new Logger(PatientService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly branchService: BranchService,
  ) {}
  async create({
    branch_id,
    data,
  }: {
    branch_id: number;
    data: Prisma.patientCreateInput;
  }) {
    this.logger.log('Create patient');

    // check if person_info.citizen_id is already exist
    const isExist = await this.branchService.findOne(
      { branch_id },
      {
        patient: {
          where: {
            person_information: {
              citizen_id: data.person_information.create.citizen_id,
            },
          },
        },
      },
    );
    if (isExist) {
      throw new BadRequestException('Citizen ID is already exist');
    }

    return this.prisma.patient.create({
      data: {
        ...data,
        branch: {
          connect: {
            branch_id,
          },
        },
      },
    });
  }

  findAll() {
    this.logger.log('FindAll patient');
    return this.prisma.patient.findMany();
  }

  findBranchPatients(branch_id: number) {
    this.logger.log('FindBranchPatients patient');
    return this.prisma.patient.findMany({
      where: {
        branch_id,
      },
    });
  }

  findCount(where: Prisma.patientWhereInput) {
    this.logger.log('FindCount patient');
    return this.prisma.patient.count({
      where,
    });
  }

  findOne(where: Prisma.patientWhereUniqueInput) {
    this.logger.log('FindOne patient');
    return this.prisma.patient.findUnique({
      where,
    });
  }

  update(
    where: Prisma.patientWhereUniqueInput,
    data: Prisma.patientUpdateInput,
  ) {
    this.logger.log('Update patient');
    return this.prisma.patient.update({
      where,
      data,
    });
  }

  remove(where: Prisma.patientWhereUniqueInput) {
    this.logger.log('Remove patient');
    return this.prisma.patient.delete({
      where,
    });
  }
}
