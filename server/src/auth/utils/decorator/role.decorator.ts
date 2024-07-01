import {SetMetadata} from "@nestjs/common";
import {$Enums} from "@prisma/client";
export const ROLE_KEY = 'role';
export const Role = (...roles: $Enums.roles[]) => SetMetadata(ROLE_KEY, roles);
