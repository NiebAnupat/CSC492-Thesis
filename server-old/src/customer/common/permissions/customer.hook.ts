import { AnyObject } from '@casl/ability/dist/types/types';
import { Injectable } from '@nestjs/common';
import {
  AuthorizableRequest,
  AuthorizableUser,
  SubjectBeforeFilterHook,
} from 'nest-casl';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class CustomerHook implements SubjectBeforeFilterHook {
  constructor(private readonly customerService: CustomerService) {}

  async run(
    request: AuthorizableRequest<AuthorizableUser<string, string>, AnyObject>,
  ) {
    const { params } = request;
    const customer = await this.customerService.findOne({
      customer_id: params.customer_id,
    });
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  }
}
