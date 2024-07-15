import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClinicDto {
  @IsNotEmpty()
  @IsString()
  clinic_name: string;

  @IsOptional()
  @IsString()
  clinic_description: string;
}
