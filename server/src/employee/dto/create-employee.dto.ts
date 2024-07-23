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
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  branch_id : number;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PersonInfo)
  person_info: PersonInfo;
}
