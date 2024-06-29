import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configSchema } from './config/config.schema';
import { AuthModule } from './auth/auth.module';
import { configurations } from './config/configuration';
import { CustomerModule } from './customer/customer.module';
import { UniqueIdModule } from './unique-id/unique-id.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...configurations],
      validationSchema: configSchema,
      isGlobal: true,
    }),
    AuthModule,
    CustomerModule,
    UniqueIdModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
