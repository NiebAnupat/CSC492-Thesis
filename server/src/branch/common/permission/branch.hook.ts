import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  SubjectBeforeFilterHook,
} from 'nest-casl';
import { Roles } from 'src/auth/common/enum/role.enum';
import { JwtUser } from 'src/auth/common/type/auth';
import { BranchService } from 'src/branch/branch.service';
import { ClinicService } from 'src/clinic/clinic.service';
import { HookRequest } from 'src/common/types/hook.request';

@Injectable()
export class BranchHook implements SubjectBeforeFilterHook {
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
      case 'PATCH' || 'DELETE':
        return await this.methodPatchOrDelete(request);
      default:
        throw new BadRequestException('Method not allowed');
    }
  }

  private async methodGet(request: HookRequest, user: JwtUser) {
    let url = request.url;
    // remove /api from url
    url = url.replace('/api/branch', '');
    // Role owner
    if (user.roles[0] === Roles.owner) {
      if (url === '/clinic') {
        const clinic = await this.clinicService.findOne({ owner_id: user.id });
        if (!clinic) {
          throw new NotFoundException('Clinic not found');
        }
        const { clinic_id } = clinic;
        const branchs =
          await this.branchService.findBranchesByClinic(clinic_id);
        if (branchs.length === 0) {
          throw new NotFoundException('Branch not found');
        }
        return { owner_id: branchs[0].clinic.owner_id };
      }
    }
    const { branch_id } = request.params;
    if (Number.isNaN(parseInt(branch_id))) {
      throw new BadRequestException('Branch ID is required');
    }
    //   TODO: Make this available to all roles
    return {
      owner_id: (await this.getBranch({ branch_id: parseInt(branch_id) }))
        .clinic.owner_id,
    };
  }
  private async methodPatchOrDelete(request: HookRequest) {
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
