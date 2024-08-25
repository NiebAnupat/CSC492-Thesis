import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Except } from 'type-fest';

@Injectable()
export class PatientService {
  private readonly logger = new Logger(PatientService.name);
  constructor(
    private readonly prisma: PrismaService,
    // private readonly uniqueIdService: UniqueIdService,
  ) {}
  async create({
    branch_id,
    data,
  }: {
    branch_id: number;
    data: Except<Prisma.patientCreateInput, 'hn' | 'patient_uid'>;
  }) {
    this.logger.log('Create patient');
    // const hn = await this.uniqueIdService.generateHN(branch_id);
    // const patient_uid = this.uniqueIdService.getUUID();
    const hn = 'asd';
    const patient_uid = 'asd';
    return this.prisma.patient.create({
      data: {
        ...data,
        hn,
        patient_uid,
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
    return this.prisma.patient.findMany()
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
