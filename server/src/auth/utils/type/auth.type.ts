import { $Enums, customer, developer } from "@prisma/client";

export type ValidateUserResponse = {
  user_id : string;
  email: string;
  role: $Enums.roles;
  package?: $Enums.packages;
}

export type UserWithRole = {
  user : customer | developer;
  role: $Enums.roles;
}
