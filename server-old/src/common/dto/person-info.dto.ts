import { $Enums } from '@prisma/client';
import { IsEnum, Matches } from 'class-validator';
import { IsDate, IsString } from 'nestjs-swagger-dto';

export class PersonInfoDto {
  @IsString({ optional: true })
  nationality: string;

  @IsString({ optional: true })
  @Matches(/^[0-9]{13}$/, { message: 'Citizen ID must be 13 digits' })
  citizen_id: string;

  @IsEnum($Enums.genders)
  gender: $Enums.genders;

  @IsString({ optional: true })
  prefix: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString({ optional: true })
  avatar: string;

  @IsString({ optional: true })
  @IsEnum($Enums.roles)
  role: $Enums.roles;

  @IsString({ optional: true })
  @Matches(/^[0-9]{10}$/, { message: 'Telephone must be 10 digits' })
  telephone: string;

  @IsString({ optional: true })
  address_line_1: string;

  @IsString({ optional: true })
  address_line_2: string;

  @IsDate({ format: 'date-time' })
  create_at: Date;

  @IsDate({ format: 'date-time' })
  update_at: Date;

  @IsDate({ format: 'date-time' })
  deleted_at: Date;

  @IsString({ optional: true })
  edit_by: string;
}
