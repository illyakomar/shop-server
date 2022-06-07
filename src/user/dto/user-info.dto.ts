import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export default class UserInfoDto {
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
  password!: string;
}