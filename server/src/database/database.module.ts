import { Module } from '@nestjs/common';
import { TypeOrmModuleRegisted } from './database.providers';

@Module({
  imports: [TypeOrmModuleRegisted],
})
export class DatabaseModule {}
