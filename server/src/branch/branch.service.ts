import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';
import { PrismaService } from 'nestjs-prisma';
import { ClinicService } from 'src/clinic/clinic.service';

@Injectable()
export class BranchService {
  private readonly logger = new Logger(BranchService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly clinicService: ClinicService,
  ) {}

  async create({
    clinic_uid,
    data,
  }: {
    user_id: string;
    clinic_uid: number;
    data: Partial<Prisma.branchCreateInput & { branch_display_id: string }>;
  }) {
    this.logger.log('Create branch');
    const clinic = await this.clinicService.findOne({ clinic_uid });
    return this.prisma.branch.create({
      data: {
        branch_display_id: data.branch_display_id,
        branch_name_th: data.branch_name_th,
        branch_name_en: data.branch_name_en,
        address_line_1: data.address_line_1,
        address_line_2: data.address_line_2,
        telephone: data.telephone,
        logo_filename: clinic.logo_filename,
        clinic: {
          connect: { clinic_uid },
        },
      },
    });
  }

  findFirst(where: Prisma.branchWhereInput) {
    this.logger.log('findFirst');
    return this.prisma.branch.findFirst({
      where: { ...where, deleted_at: null },
    });
  }

  findAll() {
    this.logger.log('findAll');
    return this.prisma.branch.findMany();
  }

  findBranchesByClinic(clinic_uid: number) {
    this.logger.log('findBranchesByClinic');
    return this.prisma.branch.findMany({
      select: {
        branch_uid: true,
        branch_display_id: true,
        branch_name_th: true,
        branch_name_en: true,
        clinic: { select: { owner_id: true } },
        employee: {
          select: {
            employee_id: true,
            employee_uid: true,
            person_information: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
      where: { clinic_uid, deleted_at: null },
      orderBy: { branch_uid: 'asc' },
    });
  }

  findOne(
    where: Prisma.branchWhereUniqueInput,
    include: Prisma.branchInclude = { clinic: { select: { owner_id: true } } },
  ) {
    this.logger.log('findOne');
    return this.prisma.branch.findUnique({
      where: {
        ...where,
        deleted_at: null,
      },
      include,
    });
  }

  update(id: number, data: Prisma.branchUpdateInput) {
    this.logger.log('update');
    return this.prisma.branch.update({
      where: { branch_uid: id },
      data,
    });
  }

  remove(where: Prisma.branchWhereUniqueInput) {
    this.logger.log('remove');
    return this.prisma.branch.update({ where, data: { deleted_at: DateTime.now().toUTC().toString() } });
  }
}
