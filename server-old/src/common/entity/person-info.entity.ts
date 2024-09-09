import { $Enums, person_information } from '@prisma/client';

export class PersonInfo implements person_information {
  
  person_information_uid: string;
  
  nationality: string;
  
  citizen_id: string;
  
  gender: $Enums.genders;
  
  prefix: string;
  
  first_name: string;
  
  last_name: string;
  
  telephone: string;
  
  address_line_1: string;
  
  address_line_2: string;
  
  provice_id: number;
  
  hire_date: Date;
  
  birth_date: Date;
  
  avatar: string;
  
  role: $Enums.roles;
  
  create_at: Date;
  
  update_at: Date;
  
  edit_by: string;
  
  deleted_at: Date;
}
