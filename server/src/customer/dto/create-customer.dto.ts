// export class CreateCustomerDto {}

import { $Enums } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// export type CreateCustomerDto = Partial<Prisma.customerCreateInput>;

// interface person_info {}

class PersonInfo {
  @IsOptional()
  nationality: string;

  @IsString()
  @Matches(/^[0-9]{13}$/, { message: 'Citizen ID must be 13 digits' })
  citizen_id: string;

  @IsEnum($Enums.genders)
  gender: $Enums.genders;

  @IsOptional()
  @IsString()
  prefix: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsOptional()
  avatar: string;

  @IsOptional()
  @IsEnum($Enums.roles)
  role: $Enums.roles;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'Telephone must be 10 digits' })
  telephone: string;

  @IsOptional()
  @IsString()
  address_line_1: string;

  @IsOptional()
  @IsString()
  address_line_2: string;

  @IsOptional()
  @IsString()
  edit_by: string;
}

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PersonInfo)
  person_info: PersonInfo;
}
