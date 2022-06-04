import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import Product from './Product';

@Entity()
export default class Brand {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  name!: string;

  @IsNotEmpty()
  @Column()
  description!: string;

  @IsNotEmpty()
  @Column()
  image!: string;

  @OneToMany(
    () => Product,
    (product) => product.brandId,
    )
  products!: Product[];
}