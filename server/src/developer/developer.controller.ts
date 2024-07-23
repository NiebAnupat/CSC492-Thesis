import { Controller, Get, UseGuards } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { excludeFromList } from '../utils/exclude';
import { JwtAuthGuard } from '../auth/common/guard/jwt-auth.guard';

@Controller('developer')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return excludeFromList(await this.developerService.findAll(), ['password']);
  }
}
