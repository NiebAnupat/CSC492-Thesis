import { ForbiddenError } from '@casl/ability';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SubjectBeforeFilterHook } from 'nest-casl';
import { Roles } from 'src/auth/common/enum/role.enum';
import { JwtUser } from 'src/auth/common/type/auth';
import { BranchService } from 'src/branch/branch.service';
import { ClinicService } from 'src/clinic/clinic.service';
import { CASLHook } from 'src/common/interfaces/CASLHook.interface';
import { HookRequest } from 'src/common/types/hook.request';
import { getUrl } from 'src/utils/getUrl';

@Injectable()
export class BranchHook implements SubjectBeforeFilterHook, CASLHook {
  constructor(
    private readonly clinicService: ClinicService,
    private readonly branchService: BranchService,
  ) {}
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

  async methodGet(request: HookRequest, user: JwtUser) {
    const url = getUrl(request.url);

    switch (user.roles[0]) {
      case Roles.developer:
        return { owner_id: 'TestID' };
      case Roles.owner: {
        if (url === '/branch/clinic') {
          const clinic = await this.clinicService.findOne({
            owner_id: user.id,
          });
          if (!clinic) {
            throw new NotFoundException('Clinic not found');
          }
          const { branchs, owner_id } = clinic;
          if (branchs.length === 0) {
            throw new NotFoundException('Branch not found');
          }
          return { owner_id: owner_id };
        }
        // if url is /branch/:branch_id
        const { branch_id } = request.params;
        if (Number.isNaN(parseInt(branch_id))) {
          throw new BadRequestException('Branch ID is required');
        }
        return {
          owner_id: (await this.getBranch({ branch_id: parseInt(branch_id) }))
            .clinic.owner_id,
        };
      }
      case Roles.employee: {
        if (url === '/branch/clinic') {
          const clinic = await this.clinicService.findOne({
            owner_id: user.owner_id,
          });
          if (!clinic) {
            throw new NotFoundException('Clinic not found');
          }
          const { branchs, owner_id } = clinic;
          if (branchs.length === 0) {
            throw new NotFoundException('Branch not found');
          }
          return { owner_id: owner_id };
        }
        return ForbiddenError;
      }
      default:
        throw new BadRequestException('User not found');
    }
  }
  async methodPatchOrDelete(request: HookRequest) {
    const { branch_id } = request.params;
    if (!branch_id) {
      throw new BadRequestException('Branch ID is required');
    }
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
