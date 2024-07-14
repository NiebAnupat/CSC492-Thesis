import { $Enums, customer, developer } from '@prisma/client';
import { Role } from 'src/auth/utils/type/roles';

export type ValidateUserResponse = {
  user_id: string;
  email: string;
  roles: Role[];
  package?: $Enums.packages;
};

export type UserWithRole = {
  _user: customer | developer;
  roles: Role[];
};

export type JwtUser = {
  id: string;
  email: string;
  roles: Role[];
  package?: $Enums.packages;
};
