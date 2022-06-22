import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ForAuthorized, ForRoles } from 'src/auth/role-auth.decorators';
import Category from 'src/entity/Сategory';
import { Role } from 'src/other/role.enum';
import { CategoryService } from './category.service';
import CategoryInfoDto from './dto/category-info.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService){}

  @ForAuthorized()
  @ForRoles(Role.Admin, Role.Moder)
  @Post('create')
  async createCategory(
    @Body() categoryInfoDto: CategoryInfoDto,
    ): Promise<Category>{
   return await this.categoryService.create(categoryInfoDto);
  }

  @ForAuthorized()
  @ForRoles(Role.Admin, Role.Moder)
  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<void> {
    try {
      if (!await this.categoryService.getById(id)) {
        throw new NotFoundException();
      }
      await this.categoryService.deleteById(id);
    } catch {
      throw new BadRequestException();
    }
  }

  @ForAuthorized()
  @ForRoles(Role.Admin, Role.Moder)
  @Put('update/:id')
  async update(
    @Body() categoryInfoDto: CategoryInfoDto,
    @Param('id') id: number,
    ): Promise<void> {
    try {
      if (!await this.categoryService.getById(id)) {
        throw new NotFoundException();
      }
      await this.categoryService.updateCategory(id, categoryInfoDto);
    } catch {
      throw new BadRequestException();
    }
  }

  @Get('all')
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Category | undefined> {
    const category = await this.categoryService.getById(id);
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

}
