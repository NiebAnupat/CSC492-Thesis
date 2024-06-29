import { $Enums } from "@prisma/client";

export type ValidateResponse = {
  email: string;
  package: $Enums.packages;
}
