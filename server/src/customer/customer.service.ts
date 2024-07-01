import { Injectable } from "@nestjs/common";
import { Prisma, customer } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import { CustomerServiceInterface } from "./utils/interfaces/service.interface";

@Injectable()
export class CustomerService implements CustomerServiceInterface {
  constructor(
    private prisma: PrismaService,
  ) {
  }

  create(data: Prisma.customerCreateInput): Promise<customer> {
    return this.prisma.customer.create({ data });
  }

  findAll(): Promise<customer[] | null> {
    return this.prisma.customer.findMany({
      include: {
        customer_person_info: true
      }
    });
  }


  findOne(where: Prisma.customerWhereUniqueInput): Promise<customer | null> {
    return this.prisma.customer.findUnique({
      where
    });
  }

  findOrCreate(
    where: Prisma.customerWhereUniqueInput,
    create: Prisma.customerCreateInput
  ): Promise<customer> {
    return this.prisma.customer.upsert({
      where,
      update: {},
      create, include: {
        customer_person_info: true
      }
    });
  }

  update(
    where: Prisma.customerWhereUniqueInput,
    data: Prisma.customerUpdateInput
  ): Promise<customer> {
    return this.prisma.customer.update({ where, data });
  }

  softDelete(where: Prisma.customerWhereUniqueInput): Promise<customer> {
    return this.prisma.customer.update({
      where,
      data: {
        customer_person_info: {
          update: {
            deleted_at: new Date()
          }
        }
      },
      include: {
        customer_person_info: true
      }
    });
  }

  remove(where: Prisma.customerWhereUniqueInput): Promise<customer> {
    return this.prisma.customer.delete({ where });
  }
}
