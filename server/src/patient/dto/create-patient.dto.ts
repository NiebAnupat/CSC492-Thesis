import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested
} from 'class-validator';
import { PersonInfo } from 'src/common/dto/person-info.dto';

export class CreatePatientDto {
  @IsOptional()
  patient_uid: string;

  @IsOptional()
  hn: string;

  @IsOptional()
  current_medication: string;

  @IsOptional()
  drug_allergy: string;

  @IsOptional()
  congenital_disease: string;

  @IsOptional()
  is_pregnant: boolean = false;

  @IsOptional()
  contact_person_name: string;

  @IsOptional()
  contact_person_relationship: string;

  @IsOptional()
  contact_person_telephone: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PersonInfo)
  person_info: PersonInfo;
}
