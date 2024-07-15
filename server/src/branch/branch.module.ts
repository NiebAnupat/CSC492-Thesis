import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { ClinicModule } from 'src/clinic/clinic.module';
import { PrismaService } from 'nestjs-prisma';

@Module({
  imports: [ClinicModule],
  controllers: [BranchController],
  providers: [PrismaService,BranchService],
})
export class BranchModule {}
