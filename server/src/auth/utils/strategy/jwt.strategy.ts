import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { ConfigKey } from "../../../config/config.enum";
import { AppConfig } from "../../../config/config.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.access_token;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      secretOrKey: configService.get<AppConfig>(ConfigKey.App).jwtSecret, // Use the secret from environment variables
      ignoreExpiration: false
    });
  }

  async validate(payload: any) {
    // This payload will be the decrypted token payload you provided when signing the token
    console.log(payload);
    return {
      customer_id: payload.customer_id,
      email: payload.email,
      provider: payload.customer_provider
    };
  }
}
