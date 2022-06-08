import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import User from 'src/entity/user';
import UserInfoDto from 'src/user/dto/user-info.dto';
import UserLoginDto from 'src/user/dto/user-login.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<{ accessToken: string }> {
    if (!userLoginDto.email || !userLoginDto.password) {
      throw new BadRequestException("Введіть email та пароль");
    }
    const user = await this.userService.getByEmail(userLoginDto.email);
    if (!user || !await this.userService.checkPassword(userLoginDto.password, user.password)) {
      throw new BadRequestException("Неправильний email або пароль");
    }
    return { accessToken: await this.authService.login(user) }; 
  }

  @Post('register')
  async register(@Body() userInfoDto: UserInfoDto): Promise<User> {
    await this.authService.registerAdmin();
    await this.verifyRegistration(userInfoDto);
    return await this.authService.register(userInfoDto);
  }

  private async verifyRegistration(userInfoDto: UserInfoDto) {
    if (await this.userService.getByEmail(userInfoDto.email)) {
      throw new BadRequestException(`Email: ${userInfoDto.email} вже зайнятий`);
    }
    if (await this.userService.getByPhoneNumber(userInfoDto.phoneNumber)) {
      throw new BadRequestException(`Номер телефону: ${userInfoDto.phoneNumber} вже зайнятий`);
    }
  }
}