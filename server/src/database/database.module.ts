import { Module } from '@nestjs/common';
import { TypeOrmModuleRegisted } from './database.providers';

@Module({
  imports: [TypeOrmModuleRegisted],
  //   providers: [...databaseProviders],
  //   exports: [...databaseProviders],
})
export class DatabaseModule {}
