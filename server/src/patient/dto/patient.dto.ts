import { Type } from 'class-transformer';
import { IsNested, IsString } from 'nestjs-swagger-dto';
import { PersonInfoDto } from 'src/common/dto/person-info.dto';

export class PatientDto {
  @IsString()
  hn: string;
  @IsString({ optional: true })
  current_medication: string;
  @IsString({ optional: true })
  drug_allergy: string;
  @IsString({ optional: true })
  congenital_disease: string;
  @IsString({ optional: true })
  is_pregnant: boolean;
  @IsString({ optional: true })
  contact_person_name: string;
  @IsString({ optional: true })
  contact_person_relation: string;
  @IsString({ optional: true })
  contact_person_telephone: string;

  @IsNested({ type: PersonInfoDto })
  @Type(() => PersonInfoDto)
  person_information: PersonInfoDto;
}
