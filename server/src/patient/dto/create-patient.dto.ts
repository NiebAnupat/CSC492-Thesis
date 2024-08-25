import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PersonInfo } from 'src/common/dto/person-info.dto';

export class CreatePatientDto {
  @IsOptional()
  current_medication: string;

  @IsOptional()
  drug_allergy: string;

  @IsOptional()
  congenital_disease: string;

  @IsNotEmpty()
  @IsNumber()
  branch_id: number;

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
