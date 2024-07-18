import { AnyObject } from '@casl/ability/dist/types/types';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  AuthorizableRequest,
  AuthorizableUser,
  SubjectBeforeFilterHook,
} from 'nest-casl';
import { BranchService } from 'src/branch/branch.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DeleteBranchHook implements SubjectBeforeFilterHook {
  constructor(private readonly branchService: BranchService) {}
  async run(
    request: AuthorizableRequest<AuthorizableUser<string, string>, AnyObject>,
  ) {
    const { branch_id } = request.params;
    if (!branch_id) {
      throw new BadRequestException('Branch ID is required');
    }
    // TODO: find branch with clinic_id
    const branch = await this.getBranch({ branch_id: parseInt(branch_id) });
    return { owner_id: branch.clinic.owner_id };
  }

  private async getBranch(where: Prisma.branchWhereUniqueInput) {
    const branch = await this.branchService.findOne(where);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
    return branch;
  }
}
