// export class CreateCustomerDto {}

import {
    IsEmail,
    IsStrongPassword
} from 'class-validator';
import { IsNested, IsString } from 'nestjs-swagger-dto';
import { PersonInfoDto } from 'src/common/dto/person-info.dto';

export class CreateCustomerDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNested({ type: PersonInfoDto })
  person_info: PersonInfoDto;
}
