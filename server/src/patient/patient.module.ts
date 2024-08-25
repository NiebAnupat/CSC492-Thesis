import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BranchModule } from 'src/branch/branch.module';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
  imports: [BranchModule],
  controllers: [PatientController],
  providers: [PrismaService,PatientService],
})
export class PatientModule {}
