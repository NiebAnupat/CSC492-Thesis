import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/utils/guard/jwt-auth.guard';
import { Role } from '../auth/utils/decorator/role.decorator';
import { RoleGuard } from '../auth/utils/guard/role.guard';
import { excludeFromList, excludeFromObject } from 'src/utils/exclude';
import { Roles } from 'src/utils/roles/roles.enum';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // @Post()
  // create(@Body() createCustomerDto: Partial<Prisma>) {
  //   return this.customerService.create(createCustomerDto);
  // }

  @Role(Roles.developer)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findAll() {
    return excludeFromList(await this.customerService.findAll(), ['password']);
  }

  @Role(Roles.developer, Roles.owner)
  // TODO : Implement CASL Guard
  @Get(':customer_id')
  async findOne(@Param('customer_id') customer_id: string) {
    return excludeFromObject(
      await this.customerService.findOne({ customer_id }),
      ['password'],
    );
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
