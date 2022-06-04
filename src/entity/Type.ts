import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import Product from './Product';

@Entity()
export default class Type {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  name!: string;

  @OneToMany(
    () => Product,
    (product) => product.typeId,
    )
  products!: Product[];
}