import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import Basket from './Basket';
import Product from './Product';

@Entity()
export default class BasketProduct {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  basketId!: number;

  @IsNotEmpty()
  @Column()
  productId!: number;

  @ManyToOne(() => Basket, (basket) => basket.basketProducts)
  basket!: Basket;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;
}