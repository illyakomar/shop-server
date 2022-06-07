import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import User from 'src/entity/user';
import UserInfoDto from './dto/user-info.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAll(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

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

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      if (!await this.userService.getById(id)) {
        throw new NotFoundException();
      }
      await this.userService.deleteById(id);
    } catch {
      throw new BadRequestException();
    }
  }

  @Post('create')
  async create(@Body() user: User): Promise<User> {
    return await this.userService.createUser(user);
  }
}
