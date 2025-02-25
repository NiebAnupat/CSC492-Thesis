import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { $Enums } from '@prisma/client';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { validate } from 'uuid';
import { AuthService } from '../../auth.service';
import { Roles } from '../enum/role.enum';

@Injectable()
export class LocalEmailStrategy extends PassportStrategy(
  Strategy,
  `${Roles.owner}, ${Roles.developer}`,
) {
  private readonly logger = new Logger(LocalEmailStrategy.name);
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    this.logger.log('Validating customer');
    const user = await this.authService.validateUser({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }

    const { owner, developer } = $Enums.roles;
    switch (user.roles[0]) {
      case owner:
        return this.authService.customer_login({
          customer_uid: user.user_id,
          email: user.email,
          customer_provider: $Enums.customer_providers.local,
        });
      case developer:
        return this.authService.developer_login({
          dev_id: user.user_id,
          email: user.email,
        });
      default:
        throw new UnauthorizedException();
    }
  }
}

@Injectable()
export class LocalEmployeeStrategy extends PassportStrategy(
  Strategy,
  Roles.employee,
) {
  private readonly logger = new Logger(LocalEmployeeStrategy.name);

  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'employee_id', passReqToCallback: true });
  }

  async validate(
    req: Request,
    employee_id: string,
    password: string,
  ): Promise<any> {
    this.logger.log('Validating employee');
    const { b, iv } = req.query;
    const branch_uid = await this.authService.decodeBranchEmployeeAuthUrl({
      encryptedText: b.toString(),
      iv: iv.toString(),
    });
    if (!validate(branch_uid)) {
      throw new BadRequestException('Invalid branch_uid');
    }
    const user = await this.authService.validateUser({
      employee_id,
      password,
      branch_uid,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.roles[0] !== Roles.employee) {
      throw new UnauthorizedException();
    }

    return this.authService.employee_login({
      employee_uid: user.user_id,
    });
  }
}
