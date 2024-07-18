import { Global, Module } from '@nestjs/common';
import { UniqueIdService } from './unique-id.service';
import { CustomerModule } from '../customer/customer.module';
import { ClinicModule } from 'src/clinic/clinic.module';

@Global()
@Module({
  imports: [CustomerModule, ClinicModule],
  providers: [UniqueIdService],
  exports: [UniqueIdService],
})
export class UniqueIdModule {}
