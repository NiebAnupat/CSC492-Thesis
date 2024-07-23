import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/common/guard/jwt-auth.guard';
import { excludeFromList, excludeFromObject } from 'src/utils/exclude';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { toAny } from 'src/utils/toAny';
import { CustomerHook } from './common/permissions/customer.hook';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // @Post()
  // create(@Body() createCustomerDto: Partial<Prisma>) {
  //   return this.customerService.create(createCustomerDto);
  // }

  @UseGuards(JwtAuthGuard, AccessGuard)
  @UseAbility(Actions.manage, toAny('customer'))
  @Get()
  async findAll() {
    return excludeFromList(await this.customerService.findAll(), ['password']);
  }

  @UseAbility(Actions.read, toAny('customer'), CustomerHook)
  @UseGuards(JwtAuthGuard, AccessGuard)
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
