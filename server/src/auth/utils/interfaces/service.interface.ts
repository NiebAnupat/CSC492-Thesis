import { $Enums, Prisma } from "@prisma/client";
import { ValidateResponse } from "../type/auth.type";
import { HttpException } from "@nestjs/common";
import { DateTime } from "luxon";

export interface AuthServiceInterface {
  validateUser(email: string, password: string): Promise<ValidateResponse>;

  customer_login({ customer_id, email, customer_provider }: {
    customer_id: string,
    email: string,
    customer_provider: $Enums.customer_providers
  }): { access_token: string };

  customer_register(customer: Partial<Prisma.customerCreateInput>): Promise<any>;
}

// {
//   customer_id: id,
//   package: $Enums.packages.free,
//   email: emails[0].value,
//   provider: $Enums.customer_providers.google,
//   customer_person_info: {
//   create: {
//     first_name: name.givenName,
//       last_name: name.familyName,
//       avatar: profileUrl,
//       create_at: DateTime.now().toISO(),
//       update_at: DateTime.now().toISO()
//    }
//   }
// }
