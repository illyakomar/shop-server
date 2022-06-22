import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import ProductInfo from './ProductInfo';
import Category from './Сategory';
import Brand from './Brand';
import ProductReview from './ProductReview';
import OrderProduct from './OrderProduct';

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
  categoryId!: number;
  
  @Column()
  brandId!: number;
  
  @OneToMany(
    () => ProductInfo,
    (productInfo) => productInfo.product,
    )
  productInfo!: ProductInfo[];

  @OneToMany(
    () => ProductReview,
    (productReview) => productReview.productId,
    )
  productReviews!: ProductReview[];

  @OneToMany(
    () => OrderProduct,
    (orderProduct) => orderProduct.product,
    )
  orderProducts!: OrderProduct[];

  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand!: Brand;
}