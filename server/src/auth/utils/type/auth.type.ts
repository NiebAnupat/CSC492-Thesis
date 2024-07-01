import { $Enums } from "@prisma/client";

export type ValidateCustomerResponse = {
  customer_id : string;
  email: string;
  package: $Enums.packages;
}
