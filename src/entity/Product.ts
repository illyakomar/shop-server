import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import ProductInfo from './ProductInfo';
import Type from './Type';
import Brand from './Brand';
import ProductReview from './ProductReview';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column()
  count!: number;

  @Column()
  specification: string;

  @Column()
  image!: string;

  @Column()
  typeId!: number;
  
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