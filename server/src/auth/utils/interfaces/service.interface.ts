import { $Enums } from "@prisma/client";
import { ValidateCustomerResponse } from "../type/auth.type";
import { CreateCustomerDto } from "../../../customer/dto/create-customer.dto";

export interface AuthServiceInterface {
  validateCustomer(email: string, password: string): Promise<ValidateCustomerResponse>;

  customer_login({ customer_id, email, customer_provider }: {
    customer_id: string,
    email: string,
    customer_provider: $Enums.customer_providers
  }): { access_token: string };

  customer_register(customer: CreateCustomerDto): Promise<any>;
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
