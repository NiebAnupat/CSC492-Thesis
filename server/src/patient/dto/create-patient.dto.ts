import { IsNested, IsString } from 'nestjs-swagger-dto';
import { PersonInfo } from 'src/common/dto/person-info.dto';

export class CreatePatientDto {
  @IsString({ optional: true })
  patient_uid: string;

  @IsString({ optional: true })
  hn: string;

  @IsString({ optional: true })
  current_medication: string;

  @IsString({ optional: true })
  drug_allergy: string;

  @IsString({ optional: true })
  congenital_disease: string;

  @IsString({ optional: true })
  is_pregnant: boolean = false;

  @IsString({ optional: true })
  contact_person_name: string;

  @IsString({ optional: true })
  contact_person_relationship: string;

  @IsString({ optional: true })
  contact_person_telephone: string;

  @IsNested({ type: PersonInfo })
  person_info: PersonInfo;
}
