import { Injectable } from '@nestjs/common';
import { Prisma, employee } from '@prisma/client';
import { log } from 'console';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ClinicService {
  constructor(private readonly prisma: PrismaService) {}

  async checkClinicExist(clinic_id: number): Promise<boolean> {
    return !!(await this.findOne({ clinic_id }));
  }

  findAll() {
    return this.prisma.clinic.findMany();
  }

  find(conditions: Prisma.clinicFindManyArgs) {
    return this.prisma.clinic.findMany(conditions);
  }

  findOne(where: Prisma.clinicWhereUniqueInput) {
    try {
      return this.prisma.clinic.findUnique({
        where: {
          clinic_id: where.clinic_id,
          owner_id: where.owner_id,
        },
        include: {
          branchs: {
            include: {
              person_information: {
                where: {
                  deleted_at: null,
                },
                select: {
                  person_information_id: true,
                  role: true,
                },
              },
            },
          },
          customer: {
            select: {
              customer_id: true,
            },
          },
        },
      });
    } catch (error) {
      log(typeof error);
    }
  }

  async create(data: Prisma.clinicCreateInput) {
    return this.prisma.clinic.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.clinicWhereUniqueInput;
    data: Prisma.clinicUpdateInput;
  }) {
    return this.prisma.clinic.update({
      data: params.data,
      where: params.where,
    });
  }

  async delete(where: Prisma.clinicWhereUniqueInput) {
    return this.prisma.clinic.delete({
      where,
    });
  }
}
