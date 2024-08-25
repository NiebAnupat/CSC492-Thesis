import { BadRequestException, Injectable } from '@nestjs/common';
import { SubjectBeforeFilterHook } from 'nest-casl';
import { JwtUser } from 'src/auth/common/type/auth';
import { CASLHook } from 'src/common/interfaces/CASLHook.interface';
import { HookRequest } from 'src/common/types/hook.request';

@Injectable()
//   TODO: Implement employee hook
export class EmployeeHook implements SubjectBeforeFilterHook, CASLHook {
  async run(request: HookRequest): Promise<any> {
    const user: JwtUser = request.user as JwtUser;
    const method = request.method;
    switch (method) {
      case 'GET':
        return await this.methodGet(request, user);
      case 'PATCH':
      case 'DELETE':
        return await this.methodPatchOrDelete(request);
      default:
        throw new BadRequestException('Method not allowed');
    }
  }

  methodGet(request: HookRequest, user: JwtUser): Promise<any> {
    return Promise.resolve({ owner_id: user.owner_id });
  }
  methodPatchOrDelete(request: HookRequest): Promise<any> {
    return Promise.resolve({ owner_id: request.params.owner_id });
  }
}
