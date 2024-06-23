import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigKey } from 'src/config/config.enum';
import { DatabaseConfig } from 'src/config/config.interface';

export const TypeOrmModuleRegisted = TypeOrmModule.forRootAsync({
  useFactory: async (configService: ConfigService) => {
    const dbConfig = configService.getOrThrow<DatabaseConfig>(
      ConfigKey.Database,
    );

    return {
      type: dbConfig.type as any,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      schema: dbConfig.schema,
      charset: 'utf8',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: dbConfig.synchronize,
    };
  },
  inject: [ConfigService],
});
