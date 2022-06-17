import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ForAuthorized, GetUser } from 'src/auth/role-auth.decorators';
import Basket from 'src/entity/Basket';
import BasketProduct from 'src/entity/BasketProduct';
import User from 'src/entity/user';
import { BasketService } from './basket.service';
import BasketDto from './dto/basket.dto';

@ForAuthorized()
@Controller('basket')
export class BasketController {
  constructor(private basketService: BasketService){}

  @Post('add')
  async addToBasket(
    @Body() basketDto: BasketDto,  
    ): Promise<BasketProduct>{
   return await this.basketService.addToBasket(basketDto);
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
