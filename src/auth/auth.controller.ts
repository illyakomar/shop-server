import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import UserInfoDto from 'src/user/dto/user-info.dto';
import UserLoginDto from 'src/user/dto/user-login.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { Role } from 'src/role/role.enum';
import WorkerRegisterDto from './dto/worker-register.dto';
import { ForRoles } from './role-auth.decorators';

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
  async register(@Body() userInfoDto: UserInfoDto): Promise<{ accessToken: string }> {
    await this.authService.registerAdmin();
    return { accessToken: await this.authService.register(userInfoDto) }; 
  }

  @ForRoles(Role.Admin)
  @Post('registerModerator')
  async registerModerator(@Body() workerRegisterDto: WorkerRegisterDto): Promise<{ accessToken: string }> {
    if (workerRegisterDto.role === Role.Admin) {
      throw new BadRequestException();
    }
    return { accessToken: await this.authService.registerModerator(workerRegisterDto) };
  }

}