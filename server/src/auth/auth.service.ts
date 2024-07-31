import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { $Enums, customer, developer, employee } from '@prisma/client';
import { CustomerService } from '../customer/customer.service';
import { compare } from 'bcrypt';
import { UniqueIdService } from '../unique-id/unique-id.service';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { DateTime } from 'luxon';
import {
  UserWithRole,
  Credentials,
  ValidateUserResponse,
} from './common/type/auth';
import { DeveloperService } from '../developer/developer.service';
import { Roles } from './common/enum/role.enum';
import { hashPassword } from '../utils/hashPassword';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { BranchService } from 'src/branch/branch.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly branchService: BranchService,
    private readonly customerService: CustomerService,
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
    private readonly uniqueIdService: UniqueIdService,
    private readonly developerService: DeveloperService,
  ) {}

  //#region Customer Section
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
        role: Roles.owner,
      }),
    };
  }
  //#endregion
  //#region Employee Section
  async employee_register(
    data: CreateEmployeeDto,
    create_by: string,
  ): Promise<{ access_token: string }> {
    // check for citizen_id is not empty
    if (!data.person_info.citizen_id)
      throw new BadRequestException('Citizen ID is required');

    // check for employee already exists
    const isEmployeeExits = await this.employeeService.checkEmployeeExist({
      branch_id: data.branch_id,
      citizen_id: data.person_info.citizen_id,
    });

    if (isEmployeeExits)
      throw new BadRequestException('Employee already exists');

    const { clinic_id } = await this.branchService.findFirst({
      branch_id: data.branch_id,
    });
    const now = DateTime.now().toUTC().toString();
    return this.employeeService
      .create({
        clinic_id,
        branch_id: data.branch_id,
        data: {
          ...data,
          password: await hashPassword(data.password),
          person_information: {
            create: {
              ...data.person_info,
              role: Roles.employee,
              create_at: now,
              update_at: now,
              edit_by: create_by,
            },
          },
        },
      })
      .then((user) => {
        return this.employee_login({
          employee_uid: user.employee_uid,
        });
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }

  employee_login({ employee_uid }: { employee_uid: string }): {
    access_token: string;
  } {
    return {
      access_token: this.jwtService.sign({
        user_id: employee_uid,
        role: Roles.employee,
      }),
    };
  }
  //#endregion
  //#region Developer Section
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
        role: Roles.developer,
      }),
    };
  }
  //#endregion

  async validateUser(data: Credentials): Promise<ValidateUserResponse> {
    const { owner, employee, developer } = Roles;
    const { email, password, employee_id, branch_id } = data;
    const { _user, roles } = await this.getUserWithRole({
      email,
      employee_id,
      branch_id,
    });

    let user: customer | employee | developer;
    switch (roles[0]) {
      case owner:
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
      case employee:
        // employee section
        user = _user as employee;
        if (await compare(password, user.password)) {
          return {
            user_id: user.employee_uid,
            roles: [employee],
          };
        }
        break;
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

  private async getUserWithRole(data: Credentials): Promise<UserWithRole> {
    const { email, employee_id, branch_id } = data;
    let user: customer | employee | developer;
    if (employee_id && branch_id) {
      user = await this.employeeService.findFirst({ employee_id, branch_id });
      if (user) return { _user: user, roles: [Roles.employee] };
      else throw new NotFoundException();
    }
    user = await this.customerService.findOne({ email });
    if (user) return { _user: user, roles: [Roles.owner] };
    user = await this.developerService.findOne(email);
    if (user) return { _user: user, roles: [Roles.developer] };
    throw new NotFoundException();
  }
}
