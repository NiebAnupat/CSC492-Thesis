import { AutoMap } from '@automapper/classes';
import { PersonInfoDto } from 'src/common/dto/person-info.dto';

export class PatientDto {
  //   @AutoMap()
  //   patient_uid: string;
  @AutoMap()
  hn: string;
  @AutoMap()
  current_medication: string;
  @AutoMap()
  drug_allergy: string;
  @AutoMap()
  congenital_disease: string;
  @AutoMap()
  is_pregnant: boolean;
  @AutoMap()
  contact_person_name: string;
  @AutoMap()
  contact_person_relation: string;
  @AutoMap()
  contact_person_telephone: string;
  @AutoMap(() => PersonInfoDto)
  person_information: PersonInfoDto;
}
