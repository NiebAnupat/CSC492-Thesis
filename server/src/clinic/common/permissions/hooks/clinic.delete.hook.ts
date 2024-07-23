import { AnyObject } from '@casl/ability/dist/types/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { clinic } from '@prisma/client';
import {
  AuthorizableRequest,
  AuthorizableUser,
  SubjectBeforeFilterHook,
} from 'nest-casl';
import { JwtUser } from 'src/auth/common/type/auth';
import { ClinicService } from 'src/clinic/clinic.service';

@Injectable()
export class DeleteClinicHook implements SubjectBeforeFilterHook {
  constructor(private readonly clinicService: ClinicService) {}
  async run(
    request: AuthorizableRequest<AuthorizableUser<string, string>, AnyObject>,
  ) {
    const user: JwtUser = request.user as JwtUser;
    const clinic = await this.getClinic(user.id);
    return clinic;
  }

  private async getClinic(owner_id: string): Promise<clinic> {
    const clinic = await this.clinicService.findOne({ owner_id });
    if (!clinic) {
      throw new NotFoundException('Clinic not found');
    }
    return clinic;
  }
}
