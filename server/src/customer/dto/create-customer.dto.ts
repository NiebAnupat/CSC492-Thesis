// export class CreateCustomerDto {}

import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PersonInfo } from 'src/common/dto/person-info.dto';

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
