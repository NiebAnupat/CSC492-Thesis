import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UniqueIdService } from 'src/unique-id/unique-id.service';
import { Prisma } from '@prisma/client';
import { EmployeeService } from 'src/employee/employee.service';
import { hashPassword } from 'src/utils/hashPassword';
import { CustomerService } from 'src/customer/customer.service';
import { ClinicService } from 'src/clinic/clinic.service';

@Injectable()
export class BranchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uniqueIdService: UniqueIdService,
    private readonly customerService: CustomerService,
    private readonly employeeService: EmployeeService,
    private readonly clinicService: ClinicService,
  ) {}

  async create({
    user_id,
    clinic_id,
    data,
  }: {
    user_id: string;
    clinic_id: number;
    data: Partial<Prisma.branchCreateInput>;
  }) {
    const branchDisplayId =
      await this.uniqueIdService.generateBranchDisplayId(clinic_id);
    const clinic = await this.clinicService.findOne({ clinic_id });
    const newBranch = await this.prisma.branch.create({
      data: {
        branch_display_id: branchDisplayId,
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

    const { person_information_id } = await this.customerService.findOne({
      customer_id: user_id,
    });
    const employee = await this.employeeService.create({
      clinic_id,
      branch_id: newBranch.branch_id,
      data: {
        password: await hashPassword('admin'),
        person_information: {
          connect: { person_information_id },
        },
      },
    });

    if (!employee) {
      throw new Error('1st Employee not created');
    }

    // update branch manager_id & edit_by
    await this.update(newBranch.branch_id, {
      branch_manager: {
        connect: { employee_uid: employee.employee_uid },
      },
      edit_by: employee.employee_id,
    });

    return this.findOne({ branch_id: newBranch.branch_id });
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

  findOne(where: Prisma.branchWhereUniqueInput) {
    return this.prisma.branch.findUnique({
      where: {
        ...where,
        deleted_at: null,
      },
      include: {
        clinic: {
          select: {
            owner_id: true,
          },
        },
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
