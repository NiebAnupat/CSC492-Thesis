import { $Enums, customer, developer, employee } from '@prisma/client';
import { Role } from 'src/auth/common/type/roles';

export type ValidateUserResponse = {
  uid?: string;
  user_id: string;
  email?: string;
  roles: Role[];
  package?: $Enums.packages;
};

export type UserWithRole = {
  _user: customer | employee | developer;
  roles: Role[];
};

export type JwtUser = {
  id: string;
  uid?: string;
  email?: string;
  roles: Role[];
  package?: $Enums.packages;
};
