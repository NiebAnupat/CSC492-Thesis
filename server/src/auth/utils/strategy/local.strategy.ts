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
    let user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const { owner, developer } = $Enums.roles;
    switch (user.role) {
      case owner:
        return this.authService.customer_login({
          customer_id: user.user_id,
          email: user.email,
          customer_provider: $Enums.customer_providers.local,
        });
      case developer:
        return this.authService.developer_login({
          dev_id: user.user_id,
          email: user.email
        });
      default:
        throw new UnauthorizedException();
    }

  }
}
