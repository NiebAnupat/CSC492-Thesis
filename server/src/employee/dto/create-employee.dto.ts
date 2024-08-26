import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsStrongPassword,
  ValidateNested,
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
  @IsNumber()
  branch_uid: number;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PersonInfo)
  person_info: PersonInfo;
}
