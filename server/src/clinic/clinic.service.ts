import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ClinicService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.clinicCreateInput) {
    return this.prisma.clinic.create({
      data,
    });
  }
}
