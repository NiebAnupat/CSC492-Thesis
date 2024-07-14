import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { PrismaService } from 'nestjs-prisma';
import { ClinicController } from './clinic.controller';
import { CaslModule } from 'nest-casl';
import { permissions } from './utils/permissions/clinic.permissions';

@Module({
  imports: [CaslModule.forFeature({ permissions })],
  providers: [ClinicService, PrismaService],
  controllers: [ClinicController],
})
export class ClinicModule {}
