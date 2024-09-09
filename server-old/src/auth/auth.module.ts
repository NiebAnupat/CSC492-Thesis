import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomerModule } from 'src/customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigKey } from 'src/config/config.enum';
import { AppConfig } from 'src/config/config.interface';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthStrategy } from './common/strategy/google-oauth.strategy.ts';
import { JwtStrategy } from './common/strategy/jwt.strategy';
import {
  LocalEmailStrategy,
  LocalEmployeeStrategy,
} from './common/strategy/local.strategy';
import { PrismaService } from 'nestjs-prisma';
import { DeveloperModule } from '../developer/developer.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { BranchModule } from 'src/branch/branch.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<AppConfig>(ConfigKey.App).jwtSecret,
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
    CustomerModule,
    BranchModule,
    EmployeeModule,
    DeveloperModule,
  ],
  controllers: [AuthController, GoogleOauthController],
  providers: [
    PrismaService,
    AuthService,
    GoogleOauthStrategy,
    JwtStrategy,
    LocalEmailStrategy,
    LocalEmployeeStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
