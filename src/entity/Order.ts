import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';
import User from './user';
import OrderProduct from './OrderProduct';
import { OrderStatus } from 'src/other/order.enum';

@Entity()
export default class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({default: 0})
  fullPrice!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Open
  })
  orderStatus!: OrderStatus;

  @Column()
  city!: string;

  @Column()
  deliveryAddress!: string;

  @Column()
  userId!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(
    () => OrderProduct,
    (orderProduct) => orderProduct.order,
    )
  orderProducts!: OrderProduct[];
}