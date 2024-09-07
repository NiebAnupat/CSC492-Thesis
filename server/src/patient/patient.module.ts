import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BranchModule } from 'src/branch/branch.module';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
  imports: [forwardRef(() => BranchModule)],
  controllers: [PatientController],
  providers: [PrismaService, PatientService],
  exports: [PatientService],
})
export class PatientModule {}
