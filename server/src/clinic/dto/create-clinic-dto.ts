import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClinicDto {
  @IsNotEmpty()
  @IsString()
  clinic_name: string;

  @IsNotEmpty()
  @IsString()
  clinic_initial: string;

  @IsOptional()
  @IsString()
  clinic_description: string;
}
