import { $Enums } from '@prisma/client';
import {
  IsOptional,
  IsString,
  Matches,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export class PersonInfo {
  @IsOptional()
  nationality: string;

  @IsOptional()
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

  // @IsNotEmpty()
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
