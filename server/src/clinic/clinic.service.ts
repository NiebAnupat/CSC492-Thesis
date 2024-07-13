import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ClinicService {
  constructor(private readonly prisma: PrismaService) { }
  
  findAll() { 
    return this.prisma.clinic.findMany();
  }

  findOne(id: number) {
    return this.prisma.clinic.findUnique({
      where: { clinic_id: id },
      include: {
        branchs: true,
        customer: {
          select: {
            customer_id: true,
          },
        },
      }
    });
  }

  async create(data: Prisma.clinicCreateInput) {
    return this.prisma.clinic.create({
      data,
    });
  }
}
