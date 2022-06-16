import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from 'src/role/role.enum';
import ProductReview from './ProductReview';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User
  })
  role!: Role;

  @OneToMany(
    () => ProductReview,
    (productReview) => productReview.userId,
    )
  productReviews!: ProductReview[];
}