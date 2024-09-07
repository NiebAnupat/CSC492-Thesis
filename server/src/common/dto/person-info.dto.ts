import { AutoMap } from '@automapper/classes';
import { $Enums } from '@prisma/client';
import { IsEnum, Matches } from 'class-validator';
import { IsString } from 'nestjs-swagger-dto';

export class PersonInfoDto {
  @AutoMap()
  @IsString({ optional: true })
  nationality: string;

  @AutoMap()
  @IsString({ optional: true })
  @Matches(/^[0-9]{13}$/, { message: 'Citizen ID must be 13 digits' })
  citizen_id: string;

  @AutoMap()
  @IsEnum($Enums.genders)
  gender: $Enums.genders;

  @AutoMap()
  @IsString({ optional: true })
  prefix: string;

  @AutoMap()
  @IsString()
  first_name: string;

  @AutoMap()
  @IsString()
  last_name: string;

  @AutoMap()
  @IsString({ optional: true })
  avatar: string;

  @AutoMap()
  @IsString({ optional: true })
  @IsEnum($Enums.roles)
  role: $Enums.roles;

  @AutoMap()
  @IsString({ optional: true })
  @Matches(/^[0-9]{10}$/, { message: 'Telephone must be 10 digits' })
  telephone: string;

  @AutoMap()
  @IsString({ optional: true })
  address_line_1: string;

  @AutoMap()
  @IsString({ optional: true })
  address_line_2: string;

  @AutoMap()
  @IsString({ optional: true })
  edit_by: string;
}
