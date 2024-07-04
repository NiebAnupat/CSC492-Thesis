import { Controller, Get, UseGuards } from "@nestjs/common";
import { DeveloperService } from "./developer.service";
import { excludeFromList } from "../utils/exclude";
import { RoleGuard } from "../auth/utils/guard/role.guard";
import { Role } from "../auth/utils/decorator/role.decorator";
import { $Enums } from "@prisma/client";
import { JwtAuthGuard } from "../auth/utils/guard/jwt-auth.guard";

@Controller("developer")
export class DeveloperController {
  constructor(
    private readonly developerService: DeveloperService
  ) {
  }

  @Role($Enums.roles.developer)
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Get()
  async findAll() {
    return excludeFromList(await this.developerService.findAll(), ["password"]);
  }
}
