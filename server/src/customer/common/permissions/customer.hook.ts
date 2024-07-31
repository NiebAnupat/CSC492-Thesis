import { AnyObject } from '@casl/ability/dist/types/types';
import { Injectable } from '@nestjs/common';
import {
  AuthorizableRequest,
  AuthorizableUser,
  SubjectBeforeFilterHook,
} from 'nest-casl';
import { JwtUser } from 'src/auth/common/type/auth';
import { CASLHook } from 'src/common/interfaces/CASLHook.interface';
import { HookRequest } from 'src/common/types/hook.request';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class CustomerHook implements SubjectBeforeFilterHook, CASLHook {
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

  methodGet(request: HookRequest, user: JwtUser): Promise<any> {
    throw new Error('Method not implemented.');
  }
  methodPatchOrDelete(request: HookRequest): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
