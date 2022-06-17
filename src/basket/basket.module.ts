import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Basket from 'src/entity/Basket';
import BasketProduct from 'src/entity/BasketProduct';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';

@Module({
  imports: [TypeOrmModule.forFeature([BasketProduct, Basket])],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService]
})
export class BasketModule {}
