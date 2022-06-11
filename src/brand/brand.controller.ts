import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ForAuthorized, ForRoles } from 'src/auth/role-auth.decorators';
import Brand from 'src/entity/Brand';
import { Role } from 'src/role/role.enum';
import { BrandService } from './brand.service';
import BrandInfoDto from './dto/brand-info.dto';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService){}

  @ForAuthorized()
  @ForRoles(Role.Admin, Role.Moder)
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createBrand(
    @Body() brandInfoDto: BrandInfoDto,
    @UploadedFile() image
    ): Promise<Brand>{
   return await this.brandService.create(brandInfoDto, image);
  }
  
  @ForAuthorized()
  @ForRoles(Role.Admin, Role.Moder)
  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<void> {
    try {
      if (!await this.brandService.getById(id)) {
        throw new NotFoundException();
      }
      await this.brandService.deleteById(id);
    } catch {
      throw new BadRequestException();
    }
  }

  @ForAuthorized()
  @ForRoles(Role.Admin, Role.Moder)
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Body() brandInfoDto: BrandInfoDto,
    @Param('id') id: number,
    @UploadedFile() image
    ): Promise<void> {
    try {
      if (!await this.brandService.getById(id)) {
        throw new NotFoundException();
      }
      await this.brandService.updateBrand(id, brandInfoDto, image);
    } catch {
      throw new BadRequestException();
    }
  }

  @Get('all')
  async getAll(): Promise<Brand[]> {
    return await this.brandService.getAllBrands();
  }
  
}
