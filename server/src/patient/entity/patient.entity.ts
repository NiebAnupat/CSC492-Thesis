import { AutoMap } from '@automapper/classes';
import { patient } from '@prisma/client';
import { PersonInfo } from 'src/common/entity/person-info.entity';

export class Patient implements patient {
  patient_uid: string;

  @AutoMap()
  hn: string;

  person_information_uid: string;

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

  branch_uid: string;

  @AutoMap(() => PersonInfo)
  person_information: PersonInfo;
}
