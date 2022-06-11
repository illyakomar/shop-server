import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from 'src/entity/Сategory';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import CategoryInfoDto from './dto/category-info.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  
  async create(categoryInfoDto: CategoryInfoDto): Promise<Category> {
    return await this.categoryRepository.save(categoryInfoDto);
  }

  async deleteById(categoryId: number): Promise<DeleteResult> {
    return this.categoryRepository.delete(categoryId);
  }

  async getById(categoryId: number): Promise<Category | undefined> {
    return this.categoryRepository.findOne({ where: { 
      id: categoryId 
    }});
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async updateCategory(id: number, categoryInfoDto: CategoryInfoDto): Promise<UpdateResult> {
    return await this.categoryRepository.update(id, categoryInfoDto);
  }
  
}
