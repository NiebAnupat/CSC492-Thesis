import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { ClinicModule } from 'src/clinic/clinic.module';
import { PrismaService } from 'nestjs-prisma';
import { permissions } from './common/permission/branch.permissions';
import { CaslModule } from 'nest-casl';

@Module({
  imports: [CaslModule.forFeature({ permissions }), ClinicModule],
  controllers: [BranchController],
  providers: [PrismaService, BranchService],
  exports: [BranchService],
})
export class BranchModule {}
