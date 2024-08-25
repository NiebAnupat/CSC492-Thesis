import { forwardRef, Module } from '@nestjs/common';
import { CaslModule } from 'nest-casl';
import { PrismaService } from 'nestjs-prisma';
import { AuthModule } from 'src/auth/auth.module';
import { ClinicModule } from 'src/clinic/clinic.module';
import { CustomerModule } from 'src/customer/customer.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { permissions } from './common/permission/branch.permissions';

@Module({
  imports: [
    CaslModule.forFeature({ permissions }),
    ClinicModule,
    CustomerModule,
    ClinicModule,
    EmployeeModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [BranchController],
  providers: [PrismaService, BranchService],
  exports: [BranchService],
})
export class BranchModule {}
