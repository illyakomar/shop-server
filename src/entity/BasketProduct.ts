import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Basket from './Basket';
import Product from './Product';

@Entity()
export default class BasketProduct {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({default: 0})
  price!: number;

  @Column({default: 1})
  quantity!: number;

  @Column()
  basketId!: number;

  @Column()
  productId!: number;

  @ManyToOne(() => Basket, (basket) => basket.basketProducts)
  basket!: Basket;

  @ManyToOne(() => Product, (product) => product.basketProducts)
  product!: Product;
}