import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/common/guard/jwt-auth.guard';
import { excludeFromList } from '../utils/exclude';
import { DeveloperService } from './developer.service';

@ApiTags('Developer')
@Controller('developer')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return excludeFromList(await this.developerService.findAll(), ['password']);
  }
}
