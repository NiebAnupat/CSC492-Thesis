import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { PrismaService } from 'nestjs-prisma';
import { ClinicController } from './clinic.controller';
import { CaslModule } from 'nest-casl';
import { permissions } from './common/permissions/clinic.permissions';
import { FileStorageModule } from 'src/file-storage/file-storage.module';

@Module({
  imports: [CaslModule.forFeature({ permissions }), FileStorageModule],
  providers: [ClinicService, PrismaService],
  controllers: [ClinicController],
  exports: [ClinicService],
})
export class ClinicModule {}
