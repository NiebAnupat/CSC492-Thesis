import { $Enums, customer, developer, employee } from '@prisma/client';
import { Role } from 'src/auth/common/type/roles';

export type Credentials = {
  email?: string;
  password?: string;
  employee_id?: string;
  branch_uid?: string;
};

export type ValidateUserResponse = {
  uid?: string;
  user_id: string;
  email?: string;
  roles: Role[];
  package?: $Enums.packages;
  branch_uid?: string;
};

export type UserWithRole = {
  _user: customer | employee | developer;
  roles: Role[];
};

export type JwtUser = {
  id: string;
  uid?: string;
  branch_uid?: string;
  email?: string;
  roles: Role[];
  package?: $Enums.packages;
  owner_uid?: string;
};
