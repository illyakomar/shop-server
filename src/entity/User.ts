import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from 'src/role/role.enum';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User
  })
  role!: Role;
}