import { Module } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { PrismaService } from "nestjs-prisma";

@Module({
  providers: [PrismaService,DeveloperService]
})
export class DeveloperModule {}
