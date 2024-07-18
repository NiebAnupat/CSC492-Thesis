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
    // data.branch_display_id = branchDisplayId;
    // data.clinic.connect = { clinic_id };
    // const newData = data as Prisma.branchCreateInput;
    return this.prisma.branch.create({
      data: {
        branch_display_id: branchDisplayId,
        branch_name: data.branch_name,
        address_line_1: data.address_line_1,
        address_line_2: data.address_line_2,
        telephone: data.telephone,
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
      where: { clinic_id },
      include: { clinic: { select: { owner_id: true } } },
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
      },
    });
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch ${updateBranchDto}`;
  }

  remove(where: Prisma.branchWhereUniqueInput) {
    return this.prisma.branch.delete({ where });
  }
}
