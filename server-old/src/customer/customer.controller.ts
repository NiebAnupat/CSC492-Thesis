import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { excludeFromList, excludeFromObject } from 'src/utils/exclude';
import { toAny } from 'src/utils/toAny';
import { JwtAuthGuard } from '../auth/common/guard/jwt-auth.guard';
import { CustomerHook } from './common/permissions/customer.hook';
import { CustomerService } from './customer.service';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // TODO : Implement this method
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
  @Get(':customer_uid')
  async findOne(@Param('customer_uid', ParseUUIDPipe) customer_uid: string) {
    return excludeFromObject(
      await this.customerService.findOne({ customer_uid }),
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

  @Delete(':customer_uid')
  remove(@Param('customer_uid', ParseUUIDPipe) customer_uid: string) {
    return this.customerService.softDelete({ customer_uid });
  }
}
