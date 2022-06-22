import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Order from './Order';
import Product from './Product';

@Entity()
export default class OrderProduct {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({default: 0})
  price!: number;

  @Column({default: 1})
  quantity!: number;

  @Column()
  orderId!: number;

  @Column()
  productId!: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order!: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  product!: Product;
}