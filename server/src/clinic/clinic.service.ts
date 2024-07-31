import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
              employee: {
                select: {
                  employee_uid: true,
                  employee_id: true,
                  person_information: {
                    select: {
                      first_name: true,
                      last_name: true,
                    },
                  },
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
      throw new Error(error);
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
