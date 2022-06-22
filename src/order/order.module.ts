import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import Order from 'src/entity/Order';
import BasketProduct from 'src/entity/OrderProduct';
import { ProductModule } from 'src/product/product.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([BasketProduct, Order]), ProductModule, forwardRef(() => AuthModule)],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
