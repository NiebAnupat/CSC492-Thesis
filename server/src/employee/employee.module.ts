import { permissions } from './common/permission/employee.permission';
import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { CaslModule } from 'nest-casl';
import { PrismaService } from 'nestjs-prisma';
import { UniqueIdModule } from 'src/unique-id/unique-id.module';
import { AuthModule } from 'src/auth/auth.module';
import { ClinicModule } from 'src/clinic/clinic.module';

@Module({
  imports: [
    CaslModule.forFeature({ permissions }),
    UniqueIdModule,
    AuthModule,
    ClinicModule,
  ],
  controllers: [EmployeeController],
  providers: [PrismaService, EmployeeService],
})
export class EmployeeModule {}
