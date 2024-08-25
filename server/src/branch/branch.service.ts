import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { ClinicService } from 'src/clinic/clinic.service';

@Injectable()
export class BranchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clinicService: ClinicService,
  ) {}

  async create({
    clinic_id,
    data,
  }: {
    user_id: string;
    clinic_id: number;
    data: Partial<Prisma.branchCreateInput & { branch_display_id: string }>;
  }) {
    const clinic = await this.clinicService.findOne({ clinic_id });
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
          connect: { clinic_id },
        },
      },
    });
  }

  findFirst(where: Prisma.branchWhereInput) {
    return this.prisma.branch.findFirst({
      where: { ...where, deleted_at: null },
    });
  }

  findAll() {
    return this.prisma.branch.findMany();
  }

  findBranchesByClinic(clinic_id: number) {
    return this.prisma.branch.findMany({
      select: {
        branch_id: true,
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
      where: { clinic_id, deleted_at: null },
      orderBy: { branch_id: 'asc' },
    });
  }

  findOne(
    where: Prisma.branchWhereUniqueInput,
    include: Prisma.branchInclude = { clinic: { select: { owner_id: true } } },
  ) {
    return this.prisma.branch.findUnique({
      where: {
        ...where,
        deleted_at: null,
      },
      include,
    });
  }

  update(id: number, data: Prisma.branchUpdateInput) {
    return this.prisma.branch.update({
      where: { branch_id: id },
      data,
    });
  }

  remove(where: Prisma.branchWhereUniqueInput) {
    return this.prisma.branch.update({ where, data: { deleted_at: null } });
  }
}
