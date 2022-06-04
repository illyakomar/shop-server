import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

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

  @IsNotEmpty()
  @Column()
  size!: number;

  @IsNotEmpty()
  @Column()
  image!: string;

  @IsNotEmpty()
  @Column()
  typeId!: number;
  
  @IsNotEmpty()
  @Column()
  brandId!: number;   
}