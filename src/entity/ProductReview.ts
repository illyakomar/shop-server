import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @Column()
  productId!: number;

  @Column()
  userId!: string;

  @ManyToOne(() => User, (user) => user.productReviews)
  user!: User;

  @ManyToOne(() => Product, (product) => product.productReviews)
  product!: Product;
}