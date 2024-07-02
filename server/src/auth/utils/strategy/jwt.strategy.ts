import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { ConfigKey } from "../../../config/config.enum";
import { AppConfig } from "../../../config/config.interface";
import { CustomerService } from "../../../customer/customer.service";
import { customer } from "@prisma/client";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly customerService: CustomerService
  ) {
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
    const c: customer = await this.customerService.findOne({ email: payload.email });
    if (!c) return NotFoundException;

    return {
      customer_id: payload.customer_id,
      email: payload.email,
      provider: payload.provider,
      role: c["customer_person_info"].role
    };
  }
}
