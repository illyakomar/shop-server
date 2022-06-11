import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';
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

  @Length(4,16, { message: 'Пароль не менше 4 i не більше 16 символів' })
  @IsNotEmpty()
  password: string;

  role: Role;
}