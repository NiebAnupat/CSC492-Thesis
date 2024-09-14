import { customer, Prisma } from '@prisma/client';

export interface CustomerServiceInterface {
  create(data: Prisma.customerCreateInput): Promise<customer>;

  findAll(): Promise<customer[] | null>;

  findOne(where: Prisma.customerWhereUniqueInput): Promise<customer | null>;

  findOrCreate(
    where: Prisma.customerWhereUniqueInput,
    create: Prisma.customerCreateInput,
  ): Promise<customer>;

  update(
    where: Prisma.customerWhereUniqueInput,
    data: Prisma.customerUpdateInput,
  ): Promise<customer>;

  softDelete(where: Prisma.customerWhereUniqueInput): Promise<customer>;

  remove(where: Prisma.customerWhereUniqueInput): Promise<customer>;
}
