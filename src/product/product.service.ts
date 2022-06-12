import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Product from 'src/entity/Product';
import { FilesService } from 'src/files/files.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import ProductDto from './dto/product.dto';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
		private readonly filesService: FilesService,
	){}

	async create(productDto: ProductDto, image: any): Promise<Product> {
    const filename = await this.filesService.createFile(image);
    return await this.productRepository.save({...productDto, image: filename});
  }

  async deleteById(productId: number): Promise<DeleteResult> {
    await this.deleteImageById(productId);
    return this.productRepository.delete(productId);
  }

  async deleteImageById(productId: number) {
    const imageName =  await this.getProductImageName(productId);
    const {image} = imageName;
    await this.filesService.deleteFile(image);
  }

  async getProductImageName(productId: number) {
    return this.productRepository.findOne({ 
     select: [ "image" ],
     where: {id: productId }
    });
  }

	async getById(productId: number): Promise<Product | undefined> {
    return this.productRepository.findOne({ where: { 
      id: productId 
    }});
  }

	async updateProduct(productId: number, productDto: ProductDto, image: any): Promise<UpdateResult> {
    if(image){
      await this.deleteImageById(productId);
      const filename = await this.filesService.createFile(image);
      return await this.productRepository.update(productId, {...productDto, image: filename});
    }
    return await this.productRepository.update(productId, productDto);
  }

	async getAllBrands(brandId: number, categoryId: number, limit: number, page: number): Promise<Product[]> {
		let products;
		page = page || 1; //Сторінка
		limit = limit || 9; // Кількість товару на одній сторінці
		let offset = page * limit - limit; //Без перших ... товарів
		if(!brandId && !categoryId){
			products = await this.productRepository.findAndCount({ take: limit, skip: offset}); 
		}
		if(brandId && !categoryId){
			products = await this.productRepository.findAndCount({ where: { 
				brandId: brandId
			}, take: limit, skip: offset}); 
		}
		if(!brandId && categoryId){
			products = await this.productRepository.findAndCount({ where: { 
				categoryId: categoryId
			}, take: limit, skip: offset}); 
		}
		if(brandId && categoryId){
			products = await this.productRepository.findAndCount({ where: { 
				categoryId: categoryId,
				brandId: brandId
			}, take: limit, skip: offset}); 
		}
    return products;
  }
}
