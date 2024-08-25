import { Global, Module } from '@nestjs/common';
import { ClinicModule } from 'src/clinic/clinic.module';
import { PatientModule } from 'src/patient/patient.module';
import { CustomerModule } from '../customer/customer.module';
import { UniqueIdService } from './unique-id.service';

@Global()
@Module({
  imports: [CustomerModule, ClinicModule,PatientModule ],
  providers: [UniqueIdService],
  exports: [UniqueIdService],
})
export class UniqueIdModule {}
