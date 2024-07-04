import { Injectable } from '@nestjs/common';
import { developer, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class DeveloperService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<developer[] | null> {
    return this.prisma.developer.findMany();
  }

  async findOne(email: string): Promise<developer | null> {
    return this.prisma.developer.findUnique({
      where: { email },
    });
  }

  async create(data: Prisma.developerCreateInput): Promise<developer> {
    return this.prisma.developer.create({ data });
  }

  async update(
    where: Prisma.developerWhereUniqueInput,
    data: Prisma.developerUpdateInput,
  ): Promise<developer> {
    return this.prisma.developer.update({ where, data });
  }
}
