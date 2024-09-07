import { AutoMap } from '@automapper/classes';
import { $Enums, person_information } from '@prisma/client';

export class PersonInfo implements person_information {
  @AutoMap()
  person_information_uid: string;
  @AutoMap()
  nationality: string;
  @AutoMap()
  citizen_id: string;
  @AutoMap()
  gender: $Enums.genders;
  @AutoMap()
  prefix: string;
  @AutoMap()
  first_name: string;
  @AutoMap()
  last_name: string;
  @AutoMap()
  telephone: string;
  @AutoMap()
  address_line_1: string;
  @AutoMap()
  address_line_2: string;
  @AutoMap()
  provice_id: number;
  @AutoMap()
  hire_date: Date;
  @AutoMap()
  birth_date: Date;
  @AutoMap()
  avatar: string;
  @AutoMap()
  role: $Enums.roles;
  @AutoMap()
  create_at: Date;
  @AutoMap()
  update_at: Date;
  @AutoMap()
  edit_by: string;
  @AutoMap()
  deleted_at: Date;
}
