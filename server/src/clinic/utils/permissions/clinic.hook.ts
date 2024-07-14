import { AnyObject } from '@casl/ability/dist/types/types';
import { Injectable } from '@nestjs/common';
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
    const { params } = request;
    return this.clinicService.findOne(+params.clinic_id);
  }
}
