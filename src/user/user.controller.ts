import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import User from 'src/entity/user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':getById')
  async getById(@Body() userId: string): Promise<User | undefined> {
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post('update')
  async update(@Body() user: User): Promise<void> {
    await this.userService.updateUser(user);
  }

  @Post('delete/:userId')
  async delete(@Param('userId') userId: string): Promise<void> {
    try {
      if (!await this.userService.getById(userId)) {
        throw new NotFoundException();
      }
      await this.userService.deleteById(userId);
    } catch {
      throw new BadRequestException();
    }
  }
}
