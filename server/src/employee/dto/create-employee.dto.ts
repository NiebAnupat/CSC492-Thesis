import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsStrongPassword,
  IsUUID,
  ValidateNested
} from 'class-validator';
import { PersonInfo } from 'src/common/dto/person-info.dto';

export class CreateEmployeeDto {
  @IsOptional()
  employee_uid: string;

  @IsOptional()
  employee_id: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsUUID()
  branch_uid: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PersonInfo)
  person_info: PersonInfo;
}
