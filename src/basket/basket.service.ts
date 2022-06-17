import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Basket from 'src/entity/Basket';
import BasketProduct from 'src/entity/BasketProduct';
import { Repository } from 'typeorm';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    @InjectRepository(BasketProduct)
    private readonly basketProductRepository: Repository<BasketProduct>
    ) {}
    
  async createBasket(userId: string): Promise<Basket>{
    const basket = new Basket();
    basket.userId = userId;
    return await this.basketRepository.save(basket);
  }

  async addToBasket(basketDto): Promise<BasketProduct>{
    return await this.basketProductRepository.save(basketDto);
  }

  async getBasketByUser(userId: string): Promise<Basket | undefined> {
    return this.basketRepository.findOne({ where: { 
      userId: userId 
    }});
  }

  async getBasketProductbyUser(userId: string): Promise<BasketProduct[] | undefined> {
    return await this.basketProductRepository.createQueryBuilder("basketProduct")
    .select(['basketProduct.id', 'product.name', 'product.price', 'product.image'])
    .leftJoin("basketProduct.basket", "basket")
    .leftJoin("basketProduct.product", "product")
    .where("basket.userId = :id", { id: userId })
    .getMany()
  }
}
