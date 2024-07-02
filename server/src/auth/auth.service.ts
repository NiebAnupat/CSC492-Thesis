import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthServiceInterface } from "./utils/interfaces/service.interface";
import { $Enums } from "@prisma/client";
import { CustomerService } from "../customer/customer.service";
import { compare, hash } from "bcrypt";
import { UniqueIdService } from "../unique-id/unique-id.service";
import { CreateCustomerDto } from "../customer/dto/create-customer.dto";
import { DateTime } from "luxon";
import { PrismaService } from "nestjs-prisma";
import { ValidateCustomerResponse } from "./utils/type/auth.type";


@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    private prisma: PrismaService,
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
        provider: customer_provider,
      })
    };
  }

  async customer_register(customer: CreateCustomerDto): Promise<{ access_token: string }> {

    // check for customer already exists
    const isEmailExits = await this.customerService.findOne({
      email: customer.email
    });

    const isCitizenIdExits = await this.prisma.person_information.findFirst({
      where: {
        citizen_id: customer.person_info.citizen_id
      }
    });

    if (isEmailExits || isCitizenIdExits) throw new BadRequestException("Customer already exists");


    const new_customer_id = await this.uniqueIdService.generateCustomerId();

    return this.customerService.create({
      customer_id: new_customer_id,
      email: customer.email,
      package: $Enums.packages.free,
      provider: $Enums.customer_providers.local,
      password: await this.hashPassword(customer.password),
      customer_person_info: {
        create: {
          ...customer.person_info,
          // citizen_id: customer.person_info.citizen_id,
          // gender: customer.person_info.gender,
          // telephone: customer.person_info.telephone,
          // first_name: customer.person_info.first_name,
          // last_name: customer.person_info.last_name,
          role: $Enums.roles.owner,
          create_at: DateTime.now().toISO(),
          update_at: DateTime.now().toISO()
          // edit_by: undefined
        }
      }
    }).then((user) => {
      return this.customer_login({
        customer_id: user.customer_id,
        email: user.email,
        customer_provider: user.provider
      });
    }).catch((error) => {
      throw new InternalServerErrorException(error);
    });

  }


  async validateCustomer(email: string, password: string): Promise<ValidateCustomerResponse> {
    const user = await this.customerService.findOne({ email });
    if (!user) throw new NotFoundException;


    if ((user.provider === $Enums.customer_providers.google) || (await compare(password, user.password))) {
      return {
        customer_id: user.customer_id,
        email: user.email,
        package: user.package
      };

    } else throw new BadRequestException("Invalid password");


  }

  private hashPassword(password: string): Promise<string> {
    const saltRounds = 13;
    return hash(password, saltRounds);
  }


}
