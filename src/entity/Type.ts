import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export default class Type {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  name!: string;
}