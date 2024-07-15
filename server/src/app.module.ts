import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { Role } from './auth/utils/type/roles';
import { Roles } from './auth/utils/enum/role.enum';
import { S3Module } from 'nestjs-s3';
import { AWSConfig } from './config/config.interface';
import { ConfigKey } from './config/config.enum';
import { FileStorageModule } from './file-storage/file-storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...configurations],
      validationSchema: configSchema,
      isGlobal: true,
    }),
    PrismaModule.forRoot(),
    S3Module.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: {
          credentials: {
            accessKeyId: configService.get<AWSConfig>(ConfigKey.AWS)
              .accessKeyId,
            secretAccessKey: configService.get<AWSConfig>(ConfigKey.AWS)
              .secretAccessKey,
          },
          region: configService.get<AWSConfig>(ConfigKey.AWS).region,
          endpoint: configService.get<AWSConfig>(ConfigKey.AWS).endpoint,
          forcePathStyle: true,
          signatureVersion: 'v4',
        },
      }),
      inject: [ConfigService],
    }),
    CaslModule.forRoot<Role>({
      superuserRole: Roles.developer,
    }),
    NestjsFormDataModule.config({ storage: MemoryStoredFile, isGlobal: true }),
    AuthModule,
    CustomerModule,
    UniqueIdModule,
    DeveloperModule,
    ClinicModule,
    FileStorageModule,
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
