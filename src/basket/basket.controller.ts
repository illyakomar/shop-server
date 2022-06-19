import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ForAuthorized, GetUser } from 'src/auth/role-auth.decorators';
import Basket from 'src/entity/Basket';
import BasketProduct from 'src/entity/BasketProduct';
import User from 'src/entity/user';
import { BasketService } from './basket.service';
import BasketUpdateDto from './dto/basket-product.dto';

@ForAuthorized()
@Controller('basket')
export class BasketController {
  constructor(private basketService: BasketService){}

  @Post('add')
  async addProduct(
    @Body() id: number,
    @GetUser() user: User,  
    ): Promise<BasketProduct[]>{
   return await this.basketService.addProduct(id, user.id);
  }

  @Post('update')
  async updateProduct(
    @Body() basketUpdateDto: BasketUpdateDto,
    @GetUser() user: User,  
    ): Promise<BasketProduct[]>{
   return await this.basketService.updateProduct(basketUpdateDto, user.id);
  }

  @Delete('delete/:productId')
  async delete(
    @Param('productId') productId: number,
    @GetUser() user: User
    ): Promise<BasketProduct[]> {
    return await this.basketService.deleteProduct(productId, user.id);
  }

  @Get('getBasketUser')
  async getBasketByUser(@GetUser() user: User): Promise<Basket | undefined> {
    const basket = await this.basketService.getBasketByUser(user.id);
    if (!basket) {
      throw new NotFoundException();
    }
    return basket;
  }


  @Get('getBasketProductUser')
  async getBasketProductbyUser(
    @GetUser() user: User
  ): Promise<BasketProduct[] | undefined> {
    return await this.basketService.getBasketProductbyUser(user.id);
  }
}
