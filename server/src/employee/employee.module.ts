import { Module } from '@nestjs/common';
import { CaslModule } from 'nest-casl';
import { PrismaService } from 'nestjs-prisma';
import { ClinicModule } from 'src/clinic/clinic.module';
import { permissions } from './common/permission/employee.permission';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

@Module({
  imports: [CaslModule.forFeature({ permissions }), ClinicModule,],
  controllers: [EmployeeController],
  providers: [PrismaService, EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
