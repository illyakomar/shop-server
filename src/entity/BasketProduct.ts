import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Basket from './Basket';
import Product from './Product';

@Entity()
export default class BasketProduct {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  basketId!: number;

  @Column()
  productId!: number;

  @ManyToOne(() => Basket, (basket) => basket.basketProducts)
  basket!: Basket;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;
}