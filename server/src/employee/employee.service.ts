import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'nestjs-prisma';
import { UniqueIdService } from 'src/unique-id/unique-id.service';
import { Roles } from 'src/auth/common/enum/role.enum';
import { employee, Prisma, branch } from '@prisma/client';
import { Except } from 'type-fest';
import { log } from 'console';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  async create({
    // user_id,
    clinic_id,
    branch_id,
    data,
  }: {
    // user_id: string;
    clinic_id: number;
    branch_id: number;
    data: Except<Prisma.employeeCreateInput, 'employee_id' | 'employee_uid'>;
  }) {
    const employee_id = await this.uniqueIdService.generateEmployeeId(
      clinic_id,
      branch_id,
    );
    let { person_information_id, employee_uid } =
      await this.prisma.employee.create({
        select: {
          person_information_id: true,
          employee_uid: true,
        },
        data: {
          employee_uid: this.uniqueIdService.getUUID(),
          employee_id,
          ...data,
        },
      });
    // link employee to branch
    // TODO: if user role is owner, use 1st employee as owner to link edit_by
    // FIXME: Change relation to branch from person_information to employee
    // await this.prisma.person_information.update({
    //   where: { person_information_id },
    //   data: {
    //     branch: {
    //       connect: {
    //         branch_id,
    //       },
    //     },
    //   },
    // });
    log('Relational data linked');

    const new_employee = await this.prisma.employee.findUnique({
      select: {
        employee_uid: true,
        employee_id: true,
        person_information: true,
      },
      where: { employee_uid },
    });

    return new_employee;
  }

  findAll() {
    return this.prisma.employee.findMany();
  }

  findOne(where: Prisma.employeeWhereUniqueInput) {
    return this.prisma.employee.findUnique({
      where: {
        ...where,
        AND: {
          person_information: {
            deleted_at: null,
          },
        },
      },
    });
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(where: Prisma.employeeWhereUniqueInput) {
    return this.prisma.employee.update({
      where,
      data: {
        person_information: {
          update: {
            deleted_at: new Date(),
          },
        },
      },
    });
  }
}
