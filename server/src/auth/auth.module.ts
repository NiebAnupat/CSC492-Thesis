import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CustomerModule } from "src/customer/customer.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ConfigKey } from "src/config/config.enum";
import { AppConfig } from "src/config/config.interface";
import { GoogleOauthController } from "./google-oauth.controller";
import { GoogleOauthStrategy } from "./utils/strategy/google-oauth.strategy.ts";
import { JwtAuthGuard } from "./utils/guard/jwt-auth.guard";
import { JwtStrategy } from "./utils/strategy/jwt.strategy";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<AppConfig>(ConfigKey.App).jwtSecret,
        signOptions: { expiresIn: "30d" }
      }),
      inject: [ConfigService]
    }),
    CustomerModule
  ],
  controllers: [AuthController, GoogleOauthController],
  providers: [AuthService, GoogleOauthStrategy, JwtStrategy]
})
export class AuthModule {
}
