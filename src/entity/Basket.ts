import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import User from './user';
import BasketProduct from './BasketProduct';

@Entity()
export default class Basket {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(
    () => BasketProduct,
    (basketProduct) => basketProduct.basketId,
    )
  basketProducts!: BasketProduct[];
}