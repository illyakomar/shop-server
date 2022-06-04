import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

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
}