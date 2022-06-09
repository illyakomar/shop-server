import { IsEmail, IsNotEmpty } from 'class-validator';

export default class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}