import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from '../person/person.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  province_id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  province_name_th: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  province_name_en: string;

  @Column({ type: 'varchar', nullable: true })
  province_code: string;

  //   @OneToMany(() => Person, (person) => person.province)
  //   persons: Person[];
  @OneToMany(() => Customer, (customer) => customer.province)
  customers: Customer[];
}
