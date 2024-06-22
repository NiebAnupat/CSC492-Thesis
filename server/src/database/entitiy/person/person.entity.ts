import {
  Column,
} from 'typeorm';
import { genders } from './person.enum';

export abstract class Person {
  @Column({
    unique: true,
    type: 'char',
    length: 13,
  })
  citizen_id: string;

  @Column({
    type: 'enum',
    enum: genders,
    nullable: false,
  })
  gender: genders;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  last_name: string;

  @Column({
    unique: true,
    type: 'char',
    length: 10,
    nullable: false,
  })
  telephone: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  address_line_1: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  address_line_2: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  provice_id: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  birth_date: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  avatar: string;


}
