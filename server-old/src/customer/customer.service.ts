import { Injectable, Logger } from '@nestjs/common';
import { Prisma, customer } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CustomerServiceInterface } from './common/interfaces/service.interface';

@Injectable()
export class CustomerService implements CustomerServiceInterface {
  private readonly logger = new Logger(CustomerService.name);
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.customerCreateInput): Promise<customer> {
    this.logger.log('Create');
    return this.prisma.customer.create({ data });
  }

  findAll(): Promise<customer[] | null> {
    return this.prisma.customer.findMany({
      include: {
        customer_person_info: true,
        clinic: true,
      },
    });
  }

  findOne(where: Prisma.customerWhereUniqueInput): Promise<customer | null> {
    return this.prisma.customer.findUnique({
      where,
      include: {
        customer_person_info: true,
        clinic: true,
      },
    });
  }

  findOrCreate(
    where: Prisma.customerWhereUniqueInput,
    create: Prisma.customerCreateInput,
  ): Promise<customer> {
    return this.prisma.customer.upsert({
      where,
      update: {},
      create,
      include: {
        customer_person_info: true,
      },
    });
  }

  update(
    where: Prisma.customerWhereUniqueInput,
    data: Prisma.customerUpdateInput,
  ): Promise<customer> {
    return this.prisma.customer.update({ where, data });
  }

  softDelete(where: Prisma.customerWhereUniqueInput): Promise<customer> {
    return this.prisma.customer.update({
      where,
      data: {
        customer_person_info: {
          update: {
            deleted_at: new Date(),
          },
        },
      },
      include: {
        customer_person_info: true,
      },
    });
  }

  remove(where: Prisma.customerWhereUniqueInput): Promise<customer> {
    return this.prisma.customer.delete({ where });
  }
}
