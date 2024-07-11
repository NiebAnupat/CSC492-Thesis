import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { PrismaService } from 'nestjs-prisma';
import { ClinicController } from './clinic.controller';

@Module({
  providers: [ClinicService, PrismaService],
  controllers: [ClinicController],
})
export class ClinicModule {}
