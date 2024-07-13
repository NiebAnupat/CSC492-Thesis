import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/utils/roles/roles';
export const ROLE_KEY = 'role';
export const Role = (...roles: Roles[]) => SetMetadata(ROLE_KEY, roles);
