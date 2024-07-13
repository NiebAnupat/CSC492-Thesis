import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configSchema } from './config/config.schema';
import { AuthModule } from './auth/auth.module';
import { configurations } from './config/configuration';
import { CustomerModule } from './customer/customer.module';
import { UniqueIdModule } from './unique-id/unique-id.module';
import { DeveloperModule } from './developer/developer.module';
import { ClinicModule } from './clinic/clinic.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { CaslModule } from 'nest-casl';
import { Role } from './utils/roles/roles';
import { Roles } from './utils/roles/roles.enum';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...configurations],
      validationSchema: configSchema,
      isGlobal: true,
    }),
    PrismaModule.forRoot(),
    CaslModule.forRoot<Role>({
      superuserRole: Roles.developer,
    }),
    NestjsFormDataModule.config({ storage: MemoryStoredFile, isGlobal: true }),
    AuthModule,
    CustomerModule,
    UniqueIdModule,
    DeveloperModule,
    ClinicModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  constructor(private readonly prisma: PrismaService) {}
  async onModuleInit() {
    try {
      await this.prisma.$connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
}
