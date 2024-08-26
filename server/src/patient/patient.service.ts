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
    branch_uid,
    data,
  }: {
    branch_uid: string;
    data: Prisma.patientCreateInput;
  }) {
    this.logger.log('Create');

    // check if person_info.citizen_id is already exist
    const isExist = await this.checkPatientExist(
      branch_uid,
      data.person_information.create.citizen_id,
    );
    if (isExist) {
      throw new BadRequestException('Patient Citizen ID is already exist');
    }

    return this.prisma.patient.create({
      data: {
        ...data,
        branch: {
          connect: {
            branch_uid,
          },
        },
      },
    });
  }
  findAll(skip: number, take: number) {
    this.logger.log(`FindAll with pagination : {skip:${skip} | take:${take}}`);
    return this.prisma.patient.findMany({
      skip,
      take,
    });
  }

  findBranchPatients(branch_uid: string, skip: number, take: number) {
    this.logger.log(
      `FindBranchPatients with pagination : {skip:${skip} | take:${take}}`,
    );
    return this.prisma.patient.findMany({
      where: {
        branch_uid,
      },
      include: {
        person_information: true,
      },
      skip,
      take,
    });
  }

  findCount(where: Prisma.patientWhereInput) {
    this.logger.log('FindCount');
    return this.prisma.patient.count({
      where,
    });
  }

  findOne(where: Prisma.patientWhereUniqueInput) {
    this.logger.log('FindOne');
    return this.prisma.patient.findUnique({
      where,
    });
  }

  update(
    where: Prisma.patientWhereUniqueInput,
    data: Prisma.patientUpdateInput,
  ) {
    this.logger.log('Update');
    return this.prisma.patient.update({
      where,
      data,
    });
  }

  remove(where: Prisma.patientWhereUniqueInput) {
    this.logger.log('Remove');
    return this.prisma.patient.delete({
      where,
    });
  }

  async checkPatientExist(branch_uid: string, citizen_id: string) {
    return !!(await this.branchService.findOne(
      { branch_uid },
      {
        patient: {
          where: {
            person_information: {
              citizen_id,
              deleted_at: null,
            },
          },
        },
      },
    ));
  }
}
