import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { $Enums, customer, developer } from '@prisma/client';
import { CustomerService } from '../customer/customer.service';
import { compare } from 'bcrypt';
import { UniqueIdService } from '../unique-id/unique-id.service';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { DateTime } from 'luxon';
import { PrismaService } from 'nestjs-prisma';
import { UserWithRole, ValidateUserResponse } from './common/type/auth';
import { DeveloperService } from '../developer/developer.service';
import { Roles } from './common/enum/role.enum';
import { hashPassword } from '../utils/hashPassword';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
    private readonly uniqueIdService: UniqueIdService,
    private readonly developerService: DeveloperService,
  ) {}

  customer_login({
    customer_id,
    email,
    customer_provider,
  }: {
    customer_id: string;
    email: string;
    customer_provider: $Enums.customer_providers;
  }): { access_token: string } {
    return {
      access_token: this.jwtService.sign({
        user_id: customer_id,
        email,
        provider: customer_provider,
        role: $Enums.roles.owner,
      }),
    };
  }

  async customer_register(
    customer: CreateCustomerDto,
  ): Promise<{ access_token: string }> {
    // check for customer already exists
    const isEmailExits = await this.customerService.findOne({
      email: customer.email,
    });

    if (isEmailExits) throw new BadRequestException('Customer already exists');

    const new_customer_id = await this.uniqueIdService.generateCustomerId();

    return this.customerService
      .create({
        customer_id: new_customer_id,
        email: customer.email,
        package: $Enums.packages.free,
        provider: $Enums.customer_providers.local,
        password: await hashPassword(customer.password),
        customer_person_info: {
          create: {
            ...customer.person_info,
            role: Roles.owner,
            create_at: DateTime.now().toUTC().toString(),
            update_at: DateTime.now().toUTC().toString(),
            // edit_by: undefined
          },
        },
      })
      .then((user) => {
        return this.customer_login({
          customer_id: user.customer_id,
          email: user.email,
          customer_provider: user.provider,
        });
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }

  async developer_register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{
    access_token: string;
  }> {
    // check for developer already exists
    const isEmailExits = await this.developerService.findOne(email);
    if (isEmailExits) throw new BadRequestException('Developer already exists');

    return this.developerService
      .create({
        email,
        password: await hashPassword(password),
      })
      .then((user) => {
        return this.developer_login({
          dev_id: user.developer_id.toString(),
          email: user.email,
        });
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }

  developer_login({ dev_id, email }: { dev_id: string; email: string }) {
    return {
      access_token: this.jwtService.sign({
        user_id: dev_id,
        email,
        role: $Enums.roles.developer,
      }),
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidateUserResponse> {
    const { owner, developer } = $Enums.roles;
    const { _user, roles } = await this.getUserWithRole(email);

    let user: customer | developer;
    switch (roles[0]) {
      case owner:
        // customer section
        user = _user as customer;
        if (
          user.provider === $Enums.customer_providers.google ||
          (await compare(password, user.password))
        ) {
          return {
            user_id: user.customer_id,
            email: user.email,
            roles: [owner],
            package: user.package,
          };
        } else throw new BadRequestException('Invalid password');
      case developer:
        // developer section
        user = _user as developer;
        if (await compare(password, user.password)) {
          return {
            user_id: user.developer_id.toString(),
            email: user.email,
            roles: [developer],
          };
        }
        break;
      default:
        throw new NotFoundException();
    }
  }

  private async getUserWithRole(email: string): Promise<UserWithRole> {
    let user: customer | developer;
    user = await this.customerService.findOne({ email });
    if (user) return { _user: user, roles: [Roles.owner] };
    user = await this.developerService.findOne(email);
    if (user) return { _user: user, roles: [Roles.developer] };
    throw new NotFoundException();
  }
 
}
