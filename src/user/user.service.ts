import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entity/user';
import { Role } from 'src/role/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async updateUser(user: User): Promise<UpdateResult> {
    return await this.userRepository.update(user.id, user);
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
