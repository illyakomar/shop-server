import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Product from './Product';

@Entity()
export default class Brand {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  image!: string;

  @OneToMany(
    () => Product,
    (product) => product.brandId,
    )
  products!: Product[];
}