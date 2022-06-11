import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Brand from 'src/entity/Brand';
import { FilesService } from 'src/files/files.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import BrandInfoDto from './dto/brand-info.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    private readonly filesService: FilesService,
  ) {}

  async create(brandInfoDto: BrandInfoDto, image: any): Promise<Brand> {
    const filename = await this.filesService.createFile(image);
    return await this.brandRepository.save({...brandInfoDto, image: filename});
  }

  async deleteById(brandId: number): Promise<DeleteResult> {
    await this.deleteImageById(brandId);
    return this.brandRepository.delete(brandId);
  }

  async deleteImageById(brandId: number) {
    const imageName =  await this.getImageName(brandId);
    const {image} = imageName;
    await this.filesService.deleteFile(image);
  }

  async getImageName(brandId: number) {
    return this.brandRepository.findOne({ 
     select: [ "image" ],
     where: {id: brandId }
    });
  }
  
  async getById(brandId: number): Promise<Brand | undefined> {
    return this.brandRepository.findOne({ where: { 
      id: brandId 
    }});
  }

  async updateBrand(brandId: number, brandInfoDto: BrandInfoDto, image: any): Promise<UpdateResult> {
    if(image){
      await this.deleteImageById(brandId);
      const filename = await this.filesService.createFile(image);
      return await this.brandRepository.update(brandId, {...brandInfoDto, image: filename});
    }
    return await this.brandRepository.update(brandId, brandInfoDto);
  }

  async getAllBrands(): Promise<Brand[]> {
    return this.brandRepository.find();
  }
}
