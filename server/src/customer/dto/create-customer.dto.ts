import { PartialType } from '@nestjs/swagger';
import { Customer } from '../entities/customer.entity';

export class CreateCustomerDto extends PartialType(Customer) {}
