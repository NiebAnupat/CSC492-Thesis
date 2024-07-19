import { Injectable } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { ClinicService } from 'src/clinic/clinic.service';

@Injectable()
export class UniqueIdService {
  constructor(
    private readonly customerService: CustomerService,
    // @Inject(forwardRef(() => ClinicService))
    private readonly clinicService: ClinicService,
  ) {}

  async generateCustomerId(): Promise<string> {
    const customer = await this.customerService.findAll();
    const currentYearBE = new Date().getFullYear() + 543;
    const yearShort = currentYearBE.toString().slice(-2);
    // Exemple : C6700001
    return `C${yearShort}${String(customer.length + 1).padStart(5, '0')}`;
  }

  async generateBranchDisplayId(clinic_id: number): Promise<string> {
    const clinic = await this.clinicService.findOne({ clinic_id });
    const { clinic_initial, branchs } = clinic;
    // Exemple : clinic_initial is DE
    // Will be DE01 DE02 DE03
    const branchNumber = branchs.length + 1;
    return `${clinic_initial}${String(branchNumber).padStart(2, '0')}`;
  }
}
