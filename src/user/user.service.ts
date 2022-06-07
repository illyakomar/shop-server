import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entity/user';
import { Role } from 'src/role/role.enum';
import UserInfoDto from './dto/user-info.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userInfoDto: UserInfoDto): Promise<User> {
    return await this.userRepository.save(userInfoDto);
  }

  async updateUser(id: string, userInfoDto: UserInfoDto): Promise<UpdateResult> {
    return await this.userRepository.update(id, userInfoDto);
  }

  async deleteById(userId: string): Promise<DeleteResult> {
    return this.userRepository.delete(userId);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(userId: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { 
      id: userId 
    }});
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { 
      email: email 
    }});
  }

  async getUsersInRole(role: Role): Promise<User[]> {
    return this.userRepository.find({ where: { 
      role: role 
    }});
  }
}