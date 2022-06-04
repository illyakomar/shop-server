import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import ProductInfo from './ProductInfo';
import Type from './Type';
import Brand from './Brand';
import ProductReview from './ProductReview';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  name!: string;

  @IsNotEmpty()
  @Column()
  price!: number;

  @IsNotEmpty()
  @Column()
  count!: number;

  @Column()
  specification: string;

  @IsNotEmpty()
  @Column()
  image!: string;

  @IsNotEmpty()
  @Column()
  typeId!: number;
  
  @IsNotEmpty()
  @Column()
  brandId!: number;
  
  @OneToMany(
    () => ProductInfo,
    (productInfo) => productInfo.productId,
    )
  productInfo!: ProductInfo[];

  @OneToMany(
    () => ProductReview,
    (productReview) => productReview.productId,
    )
  productReviews!: ProductReview[];

  @ManyToOne(() => Type, (type) => type.products)
  type!: Type;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand!: Brand;
}