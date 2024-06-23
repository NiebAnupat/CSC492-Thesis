import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { Customer } from './entities/customer.entity';
import { Prisma, customer } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.customerCreateInput): Promise<customer> {
    return this.prisma.customer.create({ data });
  }

  findAll(where: Prisma.customerWhereInput): Promise<customer[] | null> {
    return this.prisma.customer.findMany({ where });
  }

  findOne(where: Prisma.customerWhereUniqueInput): Promise<customer | null> {
    return this.prisma.customer.findUnique({ where });
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
