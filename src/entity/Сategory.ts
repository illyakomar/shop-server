import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Product from './Product';

@Entity()
export default class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
  
  @OneToMany(
    () => Product,
    (product) => product.categoryId,
    )
  products!: Product[];
}