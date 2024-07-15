import { AnyObject } from '@casl/ability/dist/types/types';
import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  AuthorizableRequest,
  AuthorizableUser,
  SubjectBeforeFilterHook,
} from 'nest-casl';
import { ClinicService } from 'src/clinic/clinic.service';

@Injectable()
export class ClinicHook implements SubjectBeforeFilterHook {
  constructor(private readonly clinicService: ClinicService) {}
  async run(
    request: AuthorizableRequest<AuthorizableUser<string, string>, AnyObject>,
  ) {
    const method = request.method;

    switch (method) {
      case 'get': {
        const { clinic_id } = request.params;
        if (!clinic_id) {
          throw new ForbiddenException('Clinic ID is required');
        }
        return this.clinicService.findOne({ clinic_id: +clinic_id });
      }
      default:
        break;
    }
  }
}
