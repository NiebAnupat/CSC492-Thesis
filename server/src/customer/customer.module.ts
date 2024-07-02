import { Module } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { PrismaModule } from "nestjs-prisma";
import { JwtStrategy } from "../auth/utils/strategy/jwt.strategy";

@Module({
  imports: [PrismaModule.forRoot()],
  controllers: [CustomerController],
  providers: [CustomerService, JwtStrategy],
  exports: [CustomerService]
})
export class CustomerModule {
}
