import { Module } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { PrismaService } from "nestjs-prisma";
import { DeveloperController } from './developer.controller';

@Module({
  providers: [PrismaService,DeveloperService],
  exports : [DeveloperService],
  controllers: [DeveloperController]
})
export class DeveloperModule {}
