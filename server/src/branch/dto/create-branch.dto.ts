import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateBranchDto {
  @IsNotEmpty()
  @IsString()
  branch_name_th: string;

  @IsNotEmpty()
  @IsString()
  branch_name_en: string;

  @IsOptional()
  branch_display_id: string;

  @IsString()
  address_line_1: string;

  @IsOptional()
  @IsString()
  address_line_2: string;

  @IsString()
  // TODO: Add validation telephone number
  @Length(10, 10)
  telephone: string;
}
