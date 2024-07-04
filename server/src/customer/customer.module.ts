import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PrismaModule } from 'nestjs-prisma';
import { JwtStrategy } from '../auth/utils/strategy/jwt.strategy';
import { DeveloperModule } from '../developer/developer.module';

@Module({
  imports: [PrismaModule.forRoot(), DeveloperModule],
  controllers: [CustomerController],
  providers: [CustomerService, JwtStrategy],
  exports: [CustomerService],
})
export class CustomerModule {}
