import { Global, Module } from '@nestjs/common';
import { UniqueIdService } from './unique-id.service';
import { CustomerModule } from '../customer/customer.module';

@Global()
@Module({
  imports: [CustomerModule],
  providers: [UniqueIdService],
  exports: [UniqueIdService],
})
export class UniqueIdModule {}
