import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Role } from 'src/role/role.enum';

export default class WorkerRegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('UA', { message: 'Введіть коректний номер телефону' })
  phoneNumber: string;

  @IsNotEmpty()
  password: string;

  role: Role;
}