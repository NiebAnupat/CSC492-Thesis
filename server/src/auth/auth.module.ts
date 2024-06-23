import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomerModule } from 'src/customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigKey } from 'src/config/config.enum';
import { AppConfig } from 'src/config/config.interface';

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
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
