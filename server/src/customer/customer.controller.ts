import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {
  }

  // @Post()
  // create(@Body() createCustomerDto: Partial<Prisma>) {
  //   return this.customerService.create(createCustomerDto);
  // }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(":customer_id")
  findOne(@Param("customer_id") customer_id: string) {
    return this.customerService.findOne({ customer_id });
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCustomerDto: UpdateCustomerDto,
  // ) {
  //   return this.customerService.update();
  // }

  @Delete(":customer_id")
  remove(@Param("customer_id") customer_id: string) {
    return this.customerService.softDelete({ customer_id });
  }
}
