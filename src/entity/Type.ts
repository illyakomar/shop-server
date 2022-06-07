import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Product from './Product';

@Entity()
export default class Type {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(
    () => Product,
    (product) => product.typeId,
    )
  products!: Product[];
}