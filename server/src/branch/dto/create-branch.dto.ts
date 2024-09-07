import { IsOptional, Matches } from 'class-validator';
import { IsString } from 'nestjs-swagger-dto';

export class CreateBranchDto {
  @IsString()
  branch_name_th: string;

  @IsString()
  branch_name_en: string;

  @IsOptional()
  branch_display_id: string;

  @IsString()
  address_line_1: string;

  @IsString({optional: true})
  address_line_2: string;

  @IsString({minLength:10 , maxLength:10})
  @Matches(/^[0-9]{10}$/, { message: 'Telephone must be 10 digits' })
  telephone: string;
}
