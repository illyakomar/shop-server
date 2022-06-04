import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import User from './user';

@Entity()
export default class Basket {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  userId!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}