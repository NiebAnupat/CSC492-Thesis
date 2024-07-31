import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, clinic } from '@prisma/client';
import { SubjectBeforeFilterHook } from 'nest-casl';
import { JwtUser } from 'src/auth/common/type/auth';
import { ClinicService } from 'src/clinic/clinic.service';
import { HookRequest } from 'src/common/types/hook.request';

@Injectable()
export class ClinicHook implements SubjectBeforeFilterHook {
  constructor(private readonly clinicService: ClinicService) {}
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
    const url = request.url;
    if (url === '/api/clinic/logo/' || url === '/api/clinic/logo') {
      return await this.getClinic({ owner_id: user.id });
    }

    const { clinic_id } = request.params;

    if (Number.isNaN(parseInt(clinic_id))) {
      throw new BadRequestException('Clinic ID is required');
    }
    return await this.getClinic({ clinic_id: parseInt(clinic_id) });
  }
  private async methodPatchOrDelete(request: HookRequest) {
    const user: JwtUser = request.user as JwtUser;
    return await this.getClinic({ owner_id: user.id });
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
