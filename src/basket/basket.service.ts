import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Basket from 'src/entity/Basket';
import BasketProduct from 'src/entity/BasketProduct';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import BasketUpdateDto from './dto/basket-product.dto';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,

    @InjectRepository(BasketProduct)
    private readonly basketProductRepository: Repository<BasketProduct>,

    private readonly productService: ProductService
    ) {}
    
  async createBasket(userId: string): Promise<Basket>{
    const basket = new Basket();
    basket.userId = userId;
    return await this.basketRepository.save(basket);
  }

  async addToBasket(productId: number, userId: string): Promise<BasketProduct>{
    const basket = await this.getBasketByUser(userId);
    if(!basket){ 
      throw new NotFoundException('Корзина користувача не знайдена!');
    }

    const product = await this.productService.getProductWithoutInfo(productId);
    if(!product){ 
      throw new NotFoundException('Такого товару немає!');
    }

    const basketProduct = new BasketProduct();
    basketProduct.basketId = basket.id;
    basketProduct.productId = product.id;
    basketProduct.price = product.price;

    basket.fullPrice = basket.fullPrice + basketProduct.price;
    await this.basketRepository.save(basket);

    return await this.basketProductRepository.save(basketProduct);
  }

  async updateBasket(basketUpdateDto: BasketUpdateDto, userId: string): Promise<BasketProduct>{
    if(basketUpdateDto.quantity < 1){
      basketUpdateDto.quantity = 1;
    }

    const basket = await this.getBasketByUser(userId);
    if(!basket){ 
      throw new NotFoundException('Корзина не знайдена!');
    }

    const basketProduct = await this.getBasketProductByBasketIdProductId(basket.id, basketUpdateDto.productId);
    if(!basketProduct){ 
      throw new NotFoundException('Товар в корзині не знайден!');
    }

    



  }

  async getBasketProductByBasketIdProductId(basketId: number, productId: number ) {
    return this.basketProductRepository.findOne({ where: { 
      basketId: basketId,
      productId: productId, 
    }});
  }

  async getBasketByUser(userId: string): Promise<Basket | undefined> {
    return this.basketRepository.findOne({ where: { 
      userId: userId 
    }});
  }

  async getBasketProductbyUser(userId: string): Promise<BasketProduct[] | undefined> {
    return await this.basketProductRepository.createQueryBuilder("basketProduct")
    .select(['basketProduct.id', 'basketProduct.price', 'product.name', 'product.image'])
    .leftJoin("basketProduct.basket", "basket")
    .leftJoin("basketProduct.product", "product")
    .where("basket.userId = :id", { id: userId })
    .getMany()
  }
}
