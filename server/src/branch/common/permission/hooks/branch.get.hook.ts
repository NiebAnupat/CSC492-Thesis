import { AnyObject } from '@casl/ability/dist/types/types';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { log } from 'console';
import {
  AuthorizableRequest,
  AuthorizableUser,
  SubjectBeforeFilterHook,
} from 'nest-casl';
import { JwtUser } from 'src/auth/common/type/auth';
import { BranchService } from 'src/branch/branch.service';
import { ClinicService } from 'src/clinic/clinic.service';

@Injectable()
export class GetBranchHook implements SubjectBeforeFilterHook {
  constructor(
    private readonly clinicService: ClinicService,
    private readonly branchService: BranchService,
  ) {}

  async run(
    request: AuthorizableRequest<AuthorizableUser<string, string>, AnyObject>,
  ) {
    const user: JwtUser = request.user as JwtUser;
    let url = request.url;

    // remove /api from url
    url = url.replace('/api/branch', '');

    // Role owner
    if (url === '/clinic') {
      const clinic = await this.clinicService.findOne({ owner_id: user.id });
      if (!clinic) {
        throw new NotFoundException('Clinic not found');
      }
      const { clinic_id } = clinic;
      const branchs = await this.branchService.findBranchesByClinic(clinic_id);
      // branchs.length === 0 && new NotFoundException('Branch not found');
      if (branchs.length === 0) {
        throw new NotFoundException('Branch not found');
      }
      return { owner_id: branchs[0].clinic.owner_id };
    }

    const { branch_id } = request.params;

    if (Number.isNaN(parseInt(branch_id))) {
      throw new BadRequestException('Branch ID is required');
    }

    return {
      owner_id: (await this.getBranch({ branch_id: parseInt(branch_id) }))
        .clinic.owner_id,
    };
  }

  private async getBranch(where: Prisma.branchWhereUniqueInput) {
    const branch = await this.branchService.findOne(where);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
    return branch;
  }
}
