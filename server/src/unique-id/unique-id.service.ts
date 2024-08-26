import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { ClinicService } from 'src/clinic/clinic.service';
import { PatientService } from 'src/patient/patient.service';
import { v7 } from 'uuid';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class UniqueIdService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly clinicService: ClinicService,
    private readonly patientService: PatientService,
  ) {}

  getUUID(): string {
    return v7();
  }

  async generateCustomerId(): Promise<string> {
    const customer = await this.customerService.findAll();
    const currentYearBE = new Date().getFullYear() + 543;
    const yearShort = currentYearBE.toString().slice(-2);
    // Exemple : C6700001
    return `C${yearShort}${String(customer.length + 1).padStart(5, '0')}`;
  }

  async generateBranchDisplayId(clinic_uid: string): Promise<string> {
    const clinic = await this.clinicService.findOne({ clinic_uid });
    const { clinic_initial, branchs } = clinic;
    // Exemple : clinic_initial is DE
    // Will be DE01 DE02 DE03
    const branchNumber = branchs.length + 1;
    return `${clinic_initial}${String(branchNumber).padStart(2, '0')}`;
  }

  async generateEmployeeId(
    clinic_uid: string,
    branch_uid: string,
  ): Promise<string> {
    const clinic = await this.clinicService.findOne({ clinic_uid });
    const { branchs } = clinic;
    const branch = branchs.find((branch) => branch.branch_uid === branch_uid);
    const fistTwoLetter = branch.branch_name_en.slice(0, 2).toUpperCase();
    const branchEmployees = branch.employee;
    log({ branchEmployees });
    const employeeNumber = branchEmployees.length + 1;
    // Exemple : branch_name_en is Dental Clinic
    // Will be DEE01 DEE02 DEE03
    return `${fistTwoLetter}E${String(employeeNumber).padStart(2, '0')}`;
  }

  async generateHN(clinic_uid: string, branch_uid: string): Promise<string> {
    const clinic = await this.clinicService.findOne({ clinic_uid });
    const { branchs } = clinic;
    const branch = branchs.find((branch) => branch.branch_uid === branch_uid);
    const firstTwoLetter = branch.branch_name_en.slice(0, 2).toUpperCase();
    const patient_count = await this.patientService.findCount({ branch_uid });
    const patientNumber = patient_count + 1;
    // Exemple : branch_name_en is Dental Clinic
    // Will be DEP00001 DEP00002 DEP00003
    return `${firstTwoLetter}P${String(patientNumber).padStart(5, '0')}`;
  }
}
