import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ForAuthorized, ForRoles } from 'src/auth/role-auth.decorators';
import User from 'src/entity/user';
import { Role } from 'src/other/role.enum';
import UserInfoDto from './dto/user-info.dto';
import { UserService } from './user.service';

@ForAuthorized()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ForRoles(Role.Admin)
  @Get('all')
  async getAll(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @ForRoles(Role.Admin)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<User | undefined> {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Put('update/:id')
  async update(
    @Body() userInfoDto: UserInfoDto,
    @Param('id') id: string,
    ): Promise<void> {
    try {
      if (!await this.userService.getById(id)) {
        throw new NotFoundException();
      }
      await this.userService.updateUser(id, userInfoDto);
    } catch {
      throw new BadRequestException();
    }
  }

  @ForRoles(Role.Admin)
  @Get('ban/:id')
  async banUser(@Param('id') id: string): Promise<User> {
    try {
      if (!await this.userService.getById(id)) {
        throw new NotFoundException();
      }
     return await this.userService.banById(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
