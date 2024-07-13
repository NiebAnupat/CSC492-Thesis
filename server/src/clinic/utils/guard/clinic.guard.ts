import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class ClinicGuard implements CanActivate {
  constructor(
    // @Inject('ClinicService') private readonly clinicService: ClinicService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.validateRequest(context);
  }

  async validateRequest(execContext: ExecutionContext): Promise<boolean> {
    // const request = execContext.switchToHttp().getRequest();
    // const { clinic_id } = request.params;
    // const user = request.user;
    // const clinic: any = await this.clinicService.findOne(+clinic_id);
    // if (user.role === 'developer') return true;
    // if (user.role === 'owner' && clinic.customer.customer_id === user.user_id)
    //   return true;
    return true;
  }
}
