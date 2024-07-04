import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/utils/guard/jwt-auth.guard';
import { Role } from '../auth/utils/decorator/role.decorator';
import { $Enums } from '@prisma/client';
import { RoleGuard } from '../auth/utils/guard/role.guard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // @Post()
  // create(@Body() createCustomerDto: Partial<Prisma>) {
  //   return this.customerService.create(createCustomerDto);
  // }

  @Role($Enums.roles.developer)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':customer_id')
  findOne(@Param('customer_id') customer_id: string) {
    return this.customerService.findOne({ customer_id });
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCustomerDto: UpdateCustomerDto,
  // ) {
  //   return this.customerService.update();
  // }

  @Delete(':customer_id')
  remove(@Param('customer_id') customer_id: string) {
    return this.customerService.softDelete({ customer_id });
  }
}
