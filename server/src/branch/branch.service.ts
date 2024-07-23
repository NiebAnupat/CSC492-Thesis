import { Injectable } from '@nestjs/common';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaService } from 'nestjs-prisma';
import { UniqueIdService } from 'src/unique-id/unique-id.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BranchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  async create({
    clinic_id,
    data,
  }: {
    clinic_id: number;
    data: Partial<Prisma.branchCreateInput>;
  }) {
    const branchDisplayId =
      await this.uniqueIdService.generateBranchDisplayId(clinic_id);
    // TODO: Create 1st employee for the Owner

    return this.prisma.branch.create({
      data: {
        branch_display_id: branchDisplayId,
        branch_name_th: data.branch_name_th,
        branch_name_en: data.branch_name_en,
        address_line_1: data.address_line_1,
        address_line_2: data.address_line_2,
        telephone: data.telephone,
        // TODO: Use ClinicService to get the clinic logo by default
        logo_filename: 'default_clinic_logo.png',
        clinic: {
          connect: { clinic_id },
        },
      },
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
        person_information: {
          select: {
            person_information_id: true,
            role: true,
            first_name: true,
            last_name: true,
            employee: {
              select: {
                employee_id: true,
                employee_uid: true,
              },
            },
          },
        },
      },
      where: { clinic_id },
      orderBy: { branch_id: 'asc' },
    });
  }

  findOne(where: Prisma.branchWhereUniqueInput) {
    return this.prisma.branch.findUnique({
      where,
      include: {
        clinic: {
          select: {
            owner_id: true,
          },
        },
        person_information: {
          select: {
            person_information_id: true,
            role: true,
            first_name: true,
            last_name: true,
            employee: {
              select: {
                employee_id: true,
                employee_uid: true,
              },
            },
          },
        },
      },
    });
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    // return `This action updates a #${id} branch ${updateBranchDto}`;
    return this.prisma.branch.update({
      where: { branch_id: id },
      data: updateBranchDto,
    });
  }

  remove(where: Prisma.branchWhereUniqueInput) {
    return this.prisma.branch.delete({ where });
  }
}
