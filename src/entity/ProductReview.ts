import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import User from './user';
import Product from './Product';

@Entity()
export default class ProductReview {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  productId!: number;

  @Column()
  userId!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Product, (product) => product.productReviews)
  product!: Product;
}