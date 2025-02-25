import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PrismaModule } from 'nestjs-prisma';
import { DeveloperModule } from '../developer/developer.module';
import { CaslModule } from 'nest-casl';
import { permissions } from './common/permissions/customer.permissions';

@Module({
  imports: [
    PrismaModule.forRoot(),
    CaslModule.forFeature({ permissions }),
    DeveloperModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
