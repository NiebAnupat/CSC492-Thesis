import { AnyObject } from '@casl/ability/dist/types/types';
import { Injectable } from '@nestjs/common';
import {
  AuthorizableRequest,
  AuthorizableUser,
  SubjectBeforeFilterHook,
} from 'nest-casl';
import { BranchService } from 'src/branch/branch.service';

@Injectable()
export class PutBranchHook implements SubjectBeforeFilterHook {
  constructor(private readonly branchService: BranchService) {}
  async run(
    request: AuthorizableRequest<AuthorizableUser<string, string>, AnyObject>,
  ) {
    throw new Error(`Method not implemented. ${request}`);
    return {
      clinic: {
        owner_id: 1,
      },
    };
  }
}
