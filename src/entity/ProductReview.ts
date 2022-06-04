import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import User from './user';
import Product from './Product';

@Entity()
export default class ProductReview {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  title!: string;

  @IsNotEmpty()
  @Column()
  description!: string;

  @IsNotEmpty()
  @Column()
  productId!: number;

  @IsNotEmpty()
  @Column()
  userId!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Product, (product) => product.productReviews)
  product!: Product;
}