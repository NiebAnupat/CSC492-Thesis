import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private readonly entityManager: EntityManager,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    const customer = new Customer(createCustomerDto);
    return this.entityManager.save<Customer>(customer);
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: string) {
    return this.customerRepository.findOneBy({
      customer_id: id,
    });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOneBy({
      customer_id: id,
    });
    if (!customer) {
      throw new NotFoundException();
    }
    Object.assign(customer, updateCustomerDto);
    return this.entityManager.save<Customer>(customer);
  }

  remove(id: string) {
    return this.customerRepository.softDelete({
      customer_id: id,
    });
  }
}
