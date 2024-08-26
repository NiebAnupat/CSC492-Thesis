import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { employee, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create({
    branch_uid,
    data,
  }: {
    clinic_uid: string;
    branch_uid: string;
    data: Prisma.employeeCreateInput;
  }) {
    this.logger.log('Create employee');

    return this.prisma.employee.create({
      select: {
        employee_uid: true,
        employee_id: true,
      },
      data: {
        ...data,
        branch: {
          connect: { branch_uid },
        },
      },
    });
  }

  async findFirst(
    where: Prisma.employeeWhereInput,
  ): Promise<employee | undefined> {
    this.logger.log('findFirst');
    try {
      const result = await this.prisma.employee.findFirst({
        where,
        include: {
          branch: {
            include: {
              clinic: true,
            },
          },
        },
      });
      return result;
    } catch (error) {
      this.logger.error({ error });
      throw new BadRequestException(error);
    }
  }

  findAll() {
    this.logger.log('findAll');
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
            clinic: true,
          },
        },
      },
    });
  }

  // check does exist by branch_uid and citizen_id
  async checkEmployeeExist({
    branch_uid,
    citizen_id,
  }: {
    branch_uid: string;
    citizen_id: string;
  }) {
    this.logger.log('checkEmployeeExist');
    return !!(await this.prisma.employee.findFirst({
      where: {
        branch_uid,
        person_information: {
          citizen_id,
          deleted_at: null,
        },
      },
    }));
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    this.logger.log('update');
    // TODO: implement update employee
    return `This action updates a #${id} employee ${updateEmployeeDto}`;
  }

  remove(where: Prisma.employeeWhereUniqueInput) {
    this.logger.log('remove');
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
