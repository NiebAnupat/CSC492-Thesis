import { IsStrongPassword, IsUUID } from 'class-validator';
import { IsNested, IsString } from 'nestjs-swagger-dto';
import { PersonInfoDto } from 'src/common/dto/person-info.dto';

export class CreateEmployeeDto {
  @IsString({ optional: true })
  employee_uid: string;

  @IsString({ optional: true })
  employee_id: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsUUID()
  branch_uid: string;

  @IsNested({ type: PersonInfoDto })
  person_info: PersonInfoDto;
}
