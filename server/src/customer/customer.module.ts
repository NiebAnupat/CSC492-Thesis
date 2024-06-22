import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Province } from 'src/database/entitiy/province/province.entity';
import { Person } from 'src/database/entitiy/person/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Customer])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
