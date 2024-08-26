import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { customer, developer, employee } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EmployeeService } from 'src/employee/employee.service';
import { ConfigKey } from '../../../config/config.enum';
import { AppConfig } from '../../../config/config.interface';
import { CustomerService } from '../../../customer/customer.service';
import { DeveloperService } from '../../../developer/developer.service';
import { Roles } from '../enum/role.enum';
import { JwtUser } from '../type/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly customerService: CustomerService,
    private readonly employeeService: EmployeeService,
    private readonly developerService: DeveloperService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.access_token;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get<AppConfig>(ConfigKey.App).jwtSecret, // Use the secret from environment variables
      ignoreExpiration: false,
    });
  }

  async validate(payload: any): Promise<UnauthorizedException | JwtUser> {
    // This payload will be the decrypted token payload you provided when signing the token
    const { email, role, user_id } = payload;

    let user: customer | employee | developer;
    const { owner, employee, developer } = Roles;

    switch (role) {
      case owner:
        user = await this.customerService.findOne({ email: email });
        break;
      case employee:
        user = await this.employeeService.findOne({ employee_uid: user_id });
        break;
      case developer:
        user = await this.developerService.findOne(email);
        break;
      default:
        return new UnauthorizedException();
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: user_id,
      roles: [role],
      ...(email && { email }),
      ...(role === owner && { package: user['package'] }),
      ...(role === employee && { owner_id: user['branch']['clinic'].owner_id, branch_uid : user['branch'].branch_uid }),
    };
  }
}
