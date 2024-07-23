import { AnyObject } from '@casl/ability/dist/types/types';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { clinic, Prisma } from '@prisma/client';
import {
  AuthorizableRequest,
  AuthorizableUser,
  SubjectBeforeFilterHook,
} from 'nest-casl';
import { JwtUser } from 'src/auth/common/type/auth';
import { ClinicService } from 'src/clinic/clinic.service';

@Injectable()
export class GetClinicHook implements SubjectBeforeFilterHook {
  constructor(private readonly clinicService: ClinicService) {}
  async run(
    request: AuthorizableRequest<AuthorizableUser<string, string>, AnyObject>,
  ) {
    const url = request.url;
    if (url === '/api/clinic/logo/' || url === '/api/clinic/logo') {
      const user: JwtUser = request.user as JwtUser;
      return await this.getClinic({ owner_id: user.id });
    }

    const { clinic_id } = request.params;
    // console.log({ clinic_id });

    if (Number.isNaN(parseInt(clinic_id))) {
      throw new BadRequestException('Clinic ID is required');
    }
    return await this.getClinic({ clinic_id: parseInt(clinic_id) });
  }

  private async getClinic(
    where: Prisma.clinicWhereUniqueInput,
  ): Promise<clinic> {
    const clinic = await this.clinicService.findOne(where);
    if (!clinic) {
      throw new NotFoundException('Clinic not found');
    }
    return clinic;
  }
}
