import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CustomerService } from "../customer/customer.service";

@Injectable()
export class UniqueIdService {
  constructor(
    @Inject(forwardRef(() => CustomerService))
    private readonly customerService: CustomerService
  ) {
  }

  async generateCustomerId(): Promise<string> {
    const customer = await this.customerService.findAll();
    const currentYearBE = new Date().getFullYear() + 543;
    const yearShort = currentYearBE.toString().slice(-2);
    const customerId = `C${yearShort}${String(customer.length + 1).padStart(4, "0")}`;
    return customerId;
  }
}
