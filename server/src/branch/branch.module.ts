import { forwardRef, Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { ClinicModule } from 'src/clinic/clinic.module';
import { PrismaService } from 'nestjs-prisma';
import { permissions } from './common/permission/branch.permissions';
import { CaslModule } from 'nest-casl';
import { EmployeeModule } from 'src/employee/employee.module';
import { CustomerModule } from 'src/customer/customer.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    CaslModule.forFeature({ permissions }),
    ClinicModule,
    CustomerModule,
    EmployeeModule,
    ClinicModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [BranchController],
  providers: [PrismaService, BranchService],
  exports: [BranchService],
})
export class BranchModule {}
