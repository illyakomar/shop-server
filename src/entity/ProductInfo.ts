import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import Product from './Product';

@Entity()
export default class ProductInfo {
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

  @ManyToOne(() => Product, (product) => product.productInfo)
  product!: Product;
}