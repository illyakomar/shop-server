import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import envConfig from '../config/environment';
import User from "src/entity/user";
import UserInfoDto from "src/user/dto/user-info.dto";
import { UserService } from "src/user/user.service";
import { Role } from 'src/role/role.enum';
import WorkerRegisterDto from "./dto/worker-register.dto";
import { BasketService } from "src/basket/basket.service";

@Injectable()
export class AuthService {
  private readonly hashRounds = 10;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly basketService: BasketService,
  ) {}
  
  async login(userInfoDto: UserInfoDto): Promise<string> {
    return this.generateJWT(userInfoDto); 
  }

  async register(userInfoDto: UserInfoDto): Promise<string> {
    await this.verifyRegistration(userInfoDto);
    userInfoDto.password = await bcrypt.hash(userInfoDto.password, this.hashRounds);
    await this.userService.createUser(userInfoDto);
    await this.basketService.createBasket(userInfoDto.id);
    return this.generateJWT(userInfoDto);
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

  async registerModerator(workerRegisterDto: WorkerRegisterDto): Promise<string> {
    await this.verifyRegistration(workerRegisterDto);
    workerRegisterDto.role = Role.Moder;
    return this.register(workerRegisterDto);
  }

  private async verifyRegistration(userInfoDto: UserInfoDto) {
    if (await this.userService.getByEmail(userInfoDto.email)) {
      throw new BadRequestException(`Email: ${userInfoDto.email} вже зайнятий`);
    }
    if (await this.userService.getByPhoneNumber(userInfoDto.phoneNumber)) {
      throw new BadRequestException(`Номер телефону: ${userInfoDto.phoneNumber} вже зайнятий`);
    }
  }

  async generateJWT(userInfoDto: UserInfoDto): Promise<string> {
    const payload = {
      email: userInfoDto.email,
      password: userInfoDto.password
    }
    return this.jwtService.signAsync(payload);
  }
}