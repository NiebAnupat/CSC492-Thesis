import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CusotmerProvider, Package } from './customer.enum';
import { Person } from 'src/database/entitiy/person/person.entity';
import { Province } from 'src/database/entitiy/province/province.entity';

@Entity()
export class Customer extends Person {
  @PrimaryColumn()
  customer_id: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  customer_google_id: string;

  @Column({
    type: 'enum',
    enum: CusotmerProvider,
    default: CusotmerProvider.local,
  })
  customer_provider: CusotmerProvider;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Package,
    default: Package.basic,
  })
  package: Package;

  @ManyToOne(() => Province, (province) => province.customers, {
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'province_id' })
  province: Province;
  
  constructor(customer: Partial<Customer>) {
    super();
    Object.assign(this, customer);
  }
}
