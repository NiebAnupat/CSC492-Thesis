import { Injectable } from '@nestjs/common';
import { SubjectBeforeFilterHook } from 'nest-casl';
import { JwtUser } from 'src/auth/common/type/auth';
import { CASLHook } from 'src/common/interfaces/CASLHook.interface';
import { HookRequest } from 'src/common/types/hook.request';

@Injectable()
//   TODO: Implement employee hook
export class EmployeeHook implements SubjectBeforeFilterHook, CASLHook {
  async run(request: HookRequest): Promise<any> {
    throw new Error('Method not implemented.');
  }

  methodGet(request: HookRequest, user: JwtUser): Promise<any> {
    throw new Error('Method not implemented.');
  }
  methodPatchOrDelete(request: HookRequest): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
