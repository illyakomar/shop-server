import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import envConfig from '../config/environment';
import User from "src/entity/user";
import UserInfoDto from "src/user/dto/user-info.dto";
import { UserService } from "src/user/user.service";
import { Role } from 'src/role/role.enum';

@Injectable()
export class AuthService {
  private readonly hashRounds = 10;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  
  async login(userInfoDto: UserInfoDto): Promise<string> {
    const payload = {
      email: userInfoDto.email,
      password: userInfoDto.password,
    };
    return this.jwtService.sign(payload);
  }

  async register(userInfoDto: UserInfoDto): Promise<User> {
    userInfoDto.password = await bcrypt.hash(userInfoDto.password, this.hashRounds);
    return this.userService.createUser(userInfoDto);
  }

  async registerAdmin(): Promise<User> {
    if (!await this.userService.checkIfAdministratorRegistered()) return;
    const administrator = new User();
    administrator.firstName = envConfig.adminFirstName;
    administrator.lastName = envConfig.adminLastName;
    administrator.phoneNumber = envConfig.adminPhoneNumber;
    administrator.email = envConfig.adminEmail;
    administrator.password = envConfig.adminPassword
    administrator.role = Role.Admin;
    await this.register(administrator);
  }
}