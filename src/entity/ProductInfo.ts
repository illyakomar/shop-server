import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Product from './Product';

@Entity()
export default class ProductInfo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  productId!: number;

  @ManyToOne(() => Product, (product) => product.productInfo)
  product!: Product;
}