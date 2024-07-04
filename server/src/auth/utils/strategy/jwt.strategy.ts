import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigKey } from '../../../config/config.enum';
import { AppConfig } from '../../../config/config.interface';
import { CustomerService } from '../../../customer/customer.service';
import { $Enums, customer, developer } from '@prisma/client';
import { DeveloperService } from '../../../developer/developer.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly customerService: CustomerService,
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

  async validate(payload: any) {
    // This payload will be the decrypted token payload you provided when signing the token

    const { email, role, user_id } = payload;

    let user: customer | developer;
    const { owner, developer } = $Enums.roles;

    switch (role) {
      case owner:
        user = await this.customerService.findOne({ email: email });
        break;
      case developer:
        user = await this.developerService.findOne(email);
        break;
      default:
        return NotFoundException;
    }

    return {
      user_id,
      email,
      role,
      ...(role === $Enums.roles.owner && { package: user['package'] }),
    };
  }
}
