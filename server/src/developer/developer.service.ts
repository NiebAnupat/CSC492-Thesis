import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class DeveloperService {
  constructor(
    private readonly prismaService: PrismaService
  ) {
  }

  async findAll() {
    return this.prismaService.developer.findMany();
  }

  async findOne(email: string) {
    return this.prismaService.developer.findUnique({
      where: { email }
    });
  }

  async create(data: Prisma.developerCreateInput) {
    return this.prismaService.developer.create({ data });
  }

  async update(where: Prisma.developerWhereUniqueInput, data: Prisma.developerUpdateInput) {
    return this.prismaService.developer.update({ where, data });
  }
}
