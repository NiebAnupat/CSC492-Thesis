import { PartialType } from '@nestjs/swagger';
import { IsNested, IsString } from 'nestjs-swagger-dto';
import { PersonInfoDto } from 'src/common/dto/person-info.dto';
import { CreatePatientDto } from './create-patient.dto';

export class UpdateRequestPatientDto extends PartialType(CreatePatientDto) {}

export class UpdateResponsePatientDto {
  @IsString()
  hn: string;
  @IsString()
  current_medication: string;
  @IsString()
  drug_allergy: string;
  @IsString()
  congenital_disease: string;
  @IsString()
  is_pregnant: boolean;
  @IsString()
  contact_person_name: string;
  @IsString()
  contact_person_relationship: string;
  @IsString()
  contact_person_telephone: string;
  @IsNested({ type: PersonInfoDto })
  person_info: PersonInfoDto;
}
