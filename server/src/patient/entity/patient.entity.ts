import { patient } from '@prisma/client';
import { PersonInfo } from 'src/common/entity/person-info.entity';

export class Patient implements patient {
  patient_uid: string;

  hn: string;

  person_information_uid: string;

  current_medication: string;

  drug_allergy: string;

  congenital_disease: string;

  is_pregnant: boolean;

  contact_person_name: string;

  contact_person_relation: string;

  contact_person_telephone: string;

  branch_uid: string;

  person_information: PersonInfo;
}
