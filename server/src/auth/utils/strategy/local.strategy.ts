import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../../auth.service";
import { $Enums } from "@prisma/client";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "email" });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateCustomer(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.customer_login({
      customer_id: user.customer_id,
      email: user.email,
      customer_provider: $Enums.customer_providers.local
    });
  }
}
