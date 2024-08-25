import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ClinicService {
  private readonly logger = new Logger(ClinicService.name);
  constructor(private readonly prisma: PrismaService) {}

  async checkClinicExist(clinic_id: number): Promise<boolean> {
    return !!(await this.findOne({ clinic_id }));
  }

  findAll() {
    this.logger.log('Find all clinic');
    return this.prisma.clinic.findMany();
  }

  find(conditions: Prisma.clinicFindManyArgs) {
    this.logger.log('Find clinic');
    return this.prisma.clinic.findMany(conditions);
  }

  findOne(where: Prisma.clinicWhereUniqueInput) {
    this.logger.log('Find one clinic');
    try {
      return this.prisma.clinic.findUnique({
        where: {
          clinic_id: where.clinic_id,
          owner_id: where.owner_id,
          deleted_at: null,
        },
        include: {
          branchs: {
            include: {
              clinic: {
                select: {
                  clinic_id: true,
                  owner_id: true,
                },
              },
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
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async create(data: Prisma.clinicCreateInput) {
    this.logger.log('Create clinic');
    return this.prisma.clinic.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.clinicWhereUniqueInput;
    data: Prisma.clinicUpdateInput;
  }) {
    this.logger.log('Update clinic');
    return this.prisma.clinic.update({
      data: params.data,
      where: {
        ...params.where,
        deleted_at: null,
      },
    });
  }

  async delete(where: Prisma.clinicWhereUniqueInput) {
    this.logger.log('Delete clinic');
    return this.prisma.clinic.update({
      where,
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
