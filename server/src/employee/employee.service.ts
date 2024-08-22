import { Injectable, Logger } from '@nestjs/common';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'nestjs-prisma';
import { UniqueIdService } from 'src/unique-id/unique-id.service';
import { Prisma, clinic } from '@prisma/client';
import { Except } from 'type-fest';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  async create({
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
    const { employee_uid } = await this.prisma.employee.create({
      select: {
        employee_uid: true,
        employee_id: true,
        person_information: true,
      },
      data: {
        employee_uid: this.uniqueIdService.getUUID(),
        employee_id,
        branch: {
          connect: { branch_id },
        },
        ...data,
      },
    });

    const new_employee = await this.prisma.employee.findUnique({
      select: {
        employee_uid: true,
        employee_id: true,
        branch_id: true,
        // person_information: true,
      },
      where: { employee_uid },
    });

    return new_employee;
  }

  findFirst(where: Prisma.employeeWhereInput) {
    this.logger.log('findFirst');
    return this.prisma.employee.findFirst({ where , include: {
      branch: {
        include: {
          clinic: true
        }
      }
    }});
  }

  findAll() {
    return this.prisma.employee.findMany();
  }

  findOne(where: Prisma.employeeWhereUniqueInput) {
    this.logger.log('findOne');
    return this.prisma.employee.findUnique({
      where: {
        ...where,
        AND: {
          person_information: {
            deleted_at: null,
          },
        },
      },
      include: {
        branch: {
          include: {
            clinic: true
          }
        }
      }
    });
  }

  // check does exist by branch_id and citizen_id
  async checkEmployeeExist({
    branch_id,
    citizen_id,
  }: {
    branch_id: number;
    citizen_id: string;
  }) {
    return !!(await this.prisma.employee.findFirst({
      where: {
        branch_id,
        person_information: {
          citizen_id,
          deleted_at: null,
        },
      },
    }));
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee ${updateEmployeeDto}`;
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
