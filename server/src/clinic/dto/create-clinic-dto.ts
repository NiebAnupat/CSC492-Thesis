import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClinicDto {
  @IsNotEmpty()
  @IsString()
  clinic_name_en: string;

  @IsNotEmpty()
  @IsString()
  clinic_name_th: string;

  @IsNotEmpty()
  @IsString()
  clinic_initial: string;

  @IsOptional()
  @IsString()
  clinic_description: string;
}
