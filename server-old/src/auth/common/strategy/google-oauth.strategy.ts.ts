import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomerService } from 'src/customer/customer.service';
import { GoogleAuthConfig } from 'src/config/config.interface';
import { ConfigKey } from 'src/config/config.enum';
import { DateTime } from 'luxon';
import { $Enums } from '@prisma/client';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly customerService: CustomerService,
  ) {
    const googleConfig = configService.get<GoogleAuthConfig>(
      ConfigKey.GoogleAuth,
    );
    super({
      clientID: googleConfig.clientID,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackURL,
      scope: googleConfig.scope,
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, name, emails, profileUrl } = profile;

    // Here a custom User object is returned. In the the repo I'm using a UsersService with repository pattern, learn more here: https://docs.nestjs.com/techniques/database

    // create a new user or return an existing one
    const user = await this.customerService.findOrCreate(
      {
        customer_id: id,
      },
      {
        customer_id: id,
        package: $Enums.packages.free,
        email: emails[0].value,
        provider: $Enums.customer_providers.google,
        customer_person_info: {
          create: {
            first_name: name.givenName,
            last_name: name.familyName,
            avatar: profileUrl,
            role: $Enums.roles.owner,
            create_at: DateTime.now().toUTC().toString(),
            update_at: DateTime.now().toUTC().toString(),
          },
        },
      },
    );

    if (user) {
      return done(null, user);
    }

    done(new InternalServerErrorException('Error when create user'), false);
  }
}
