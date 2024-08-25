// export class CreateCustomerDto {}

import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { PersonInfo } from 'src/common/dto/person-info.dto';

export class CreateCustomerDto {
  @IsOptional()
  customer_id: string;

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
