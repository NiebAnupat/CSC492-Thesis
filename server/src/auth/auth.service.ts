import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { $Enums, customer, developer, employee } from '@prisma/client';
import { compare } from 'bcrypt';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { DateTime } from 'luxon';
import { BranchService } from 'src/branch/branch.service';
import { ConfigKey } from 'src/config/config.enum';
import { AppConfig } from 'src/config/config.interface';
import { EmployeeService } from 'src/employee/employee.service';
import { CustomerService } from '../customer/customer.service';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { DeveloperService } from '../developer/developer.service';
import { hashPassword } from '../utils/hashPassword';
import { Roles } from './common/enum/role.enum';
import {
    Credentials,
    UserWithRole,
    ValidateUserResponse,
} from './common/type/auth';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly _appConfig: AppConfig;
  constructor(
    private readonly branchService: BranchService,
    private readonly customerService: CustomerService,
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
    private readonly developerService: DeveloperService,
    private readonly config: ConfigService,
  ) {
    if (!this._appConfig)
      this._appConfig = this.config.get<AppConfig>(ConfigKey.App);
  }

  //#region Customer Section
  async customer_register(
    customer: CreateCustomerDto,
  ): Promise<{ access_token: string }> {
    this.logger.log('Customer register');
    // check for customer already exists
    const isEmailExits = await this.customerService.findOne({
      email: customer.email,
    });

    if (isEmailExits) throw new BadRequestException('Customer already exists');

    return this.customerService
      .create({
        customer_id: customer.customer_id,
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
    this.logger.log('Customer logged in successfully');
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
  // async employee_register(
  //   data: CreateEmployeeDto,
  //   create_by: string,
  // ): Promise<{ access_token: string }> {
  //   this.logger.log('Employee register');
  //   // check for citizen_id is not empty
  //   if (!data.person_info.citizen_id)
  //     throw new BadRequestException('Citizen ID is required');

  //   // check for employee already exists
  //   const isEmployeeExits = await this.employeeService.checkEmployeeExist({
  //     branch_uid: data.branch_uid,
  //     citizen_id: data.person_info.citizen_id,
  //   });

  //   if (isEmployeeExits)
  //     throw new BadRequestException('Employee already exists');

  //   const { clinic_uid } = await this.branchService.findFirst({
  //     branch_uid: data.branch_uid,
  //   });
  //   const now = DateTime.now().toUTC().toString();
  //   return this.employeeService
  //     .create({
  //       clinic_uid,
  //       branch_uid: data.branch_uid,
  //       data: {
  //         ...data,
  //         password: await hashPassword(data.password),
  //         person_information: {
  //           create: {
  //             ...data.person_info,
  //             role: Roles.employee,
  //             create_at: now,
  //             update_at: now,
  //             edit_by: create_by,
  //           },
  //         },
  //       },
  //     })
  //     .then((user) => {
  //       return this.employee_login({
  //         employee_uid: user.employee_uid,
  //       });
  //     })
  //     .catch((error) => {
  //       throw new InternalServerErrorException(error);
  //     });
  // }

  employee_login({ employee_uid }: { employee_uid: string }): {
    access_token: string;
  } {
    this.logger.log('Employee logged in successfully');
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
    this.logger.log('Developer register');
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
    this.logger.log('Developer login');
    return {
      access_token: this.jwtService.sign({
        user_id: dev_id,
        email,
        role: Roles.developer,
      }),
    };
  }
  //#endregion

  //#region Branch Section
  async generateBranchEmployeeAuthUrl(branch_uid: number): Promise<string> {
    this.logger.log('Generating branch employee auth url');
    const iv = randomBytes(16);
    const key = this._appConfig.encodeSecret;
    const algorithm = 'aes-256-cbc';
    const cipher = createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(branch_uid.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // TODO : In future we can use short url service to generate short url
    return `${this._appConfig.originsURL[0]}/auth/employee/login?b=${encrypted}&iv=${iv.toString('hex')}`;
  }

  async decodeBranchEmployeeAuthUrl(encrypted: {
    encryptedText: string;
    iv: string;
  }): Promise<number> {
    this.logger.log('Decoding branch employee auth url');
    const key = this._appConfig.encodeSecret;
    const algorithm = 'aes-256-cbc';
    const decipher = createDecipheriv(
      algorithm,
      key,
      Buffer.from(encrypted.iv, 'hex'),
    );
    let decrypted = decipher.update(encrypted.encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return parseInt(decrypted);
  }
  //#endregion
  async validateUser(data: Credentials): Promise<ValidateUserResponse> {
    this.logger.log('Validating user');
    const { owner, employee, developer } = Roles;
    const { email, password, employee_id, branch_uid } = data;
    const { _user, roles } = await this.getUserWithRole({
      email,
      employee_id,
      branch_uid,
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
    this.logger.log('Getting user with role');
    const { email, employee_id, branch_uid } = data;
    let user: customer | employee | developer;
    if (employee_id && branch_uid) {
      user = await this.employeeService.findFirst({ employee_id, branch_uid });
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
