import { SetMetadata } from '@nestjs/common';
import { $Enums } from "@prisma/client";
export const PACKAGE_KEY = 'package'
export const Package = (...packages: $Enums.packages[]) => SetMetadata(PACKAGE_KEY, packages);
