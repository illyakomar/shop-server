import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import Product from 'src/entity/Product';
import ProductDto from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService){}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @Body() productDto: ProductDto,
    @UploadedFile() image
    ): Promise<Product>{
   return await this.productService.create(productDto, image);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<void> {
    try {
      if (!await this.productService.getById(id)) {
        throw new NotFoundException();
      }
     await this.productService.deleteById(id);
    } catch {
      throw new BadRequestException();
    }
  }

  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Body() productDto: ProductDto,
    @Param('id') id: number,
    @UploadedFile() image
    ): Promise<void> {
    try {
      if (!await this.productService.getById(id)) {
        throw new NotFoundException();
      }
      await this.productService.updateProduct(id, productDto, image);
    } catch {
      throw new BadRequestException();
    }
  }

  @Get('all')
  async getAll(
    @Query('brandId') brandId: number,
    @Query('categoryId') categoryId: number,
    @Query('limit') limit: number,
    @Query('page') page: number,
		): Promise<Product[]> {
    return await this.productService.getAllBrands(brandId,categoryId, limit, page);
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Product | undefined> {
    const user = await this.productService.getById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

}
