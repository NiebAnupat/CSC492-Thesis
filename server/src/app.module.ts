import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configSchema } from './config/config.schema';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { configurations } from './config/configuration';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...configurations],
      validationSchema: configSchema,
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
