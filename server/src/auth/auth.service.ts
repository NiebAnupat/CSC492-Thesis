import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthServiceInterface } from "./utils/interfaces/service.interface";
import { $Enums } from "@prisma/client";
import { CustomerService } from "../customer/customer.service";
import { ValidateResponse } from "./utils/type/auth.type";
import { compare } from "bcrypt";
import { UniqueIdService } from "../unique-id/unique-id.service";


  @Injectable()
  export class AuthService implements AuthServiceInterface {
  constructor(
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
    private readonly uniqueIdService: UniqueIdService
  ) {
  }

  customer_login({ customer_id, email, customer_provider }: {
    customer_id: string;
    email: string;
    customer_provider: $Enums.customer_providers;
  }): { access_token: string; } {
    return {
      access_token: this.jwtService.sign({
        customer_id,
        email,
        provider: customer_provider
      })
    };
  }

  async validateUser(email: string, password: string): Promise<ValidateResponse> {
    const user = await this.customerService.findOne({ email });
    if (!user) {
      throw new NotFoundException;
    }

    if (user.provider === $Enums.customer_providers.google) {
      return {
        email: user.email,
        package: user.package
      };
      ;
    }

    if (await compare(password, user.password)) {
      return {
        email: user.email,
        package: user.package
      };
    } else {
      throw new BadRequestException(
        "Invalid password"
      );
    }

  }

  async customer_register({ email, password }: { email: string; password: string; }): Promise<any> {
    throw new Error("Method not implemented.");
  }

}
