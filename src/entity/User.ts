import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Role } from 'src/auth/role.enum';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @IsNotEmpty()
  @Column()
  firstName!: string;

  @IsNotEmpty()
  @Column()
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  @Column()
  email!: string;

  @IsNotEmpty()
  @IsPhoneNumber('UA', { message: 'Введіть коректний номер телефону' })
  @Column()
  phoneNumber!: string;

  @IsNotEmpty()
  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User
  })
  role!: Role;
}