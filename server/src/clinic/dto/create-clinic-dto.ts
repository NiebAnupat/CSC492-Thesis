import { IsString } from 'nestjs-swagger-dto';

export class CreateClinicDto {
  @IsString()
  clinic_name_en: string;

  @IsString()
  clinic_name_th: string;

  @IsString()
  clinic_initial: string;

  @IsString({optional: true})
  clinic_description: string;
}
