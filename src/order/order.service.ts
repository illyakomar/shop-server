import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import OrderProductUpdateDto from './dto/order-product-update.dto';
import Order from 'src/entity/Order';
import OrderProduct from 'src/entity/OrderProduct';
import CreateOrderDto from './dto/create-order.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,

    private readonly productService: ProductService,
    ) {}
    
  async createOrder(createOrderDto: CreateOrderDto, userId: string): Promise<Order>{
    const order = new Order();
    order.userId = userId;
    order.city = createOrderDto.city;
    order.deliveryAddress = createOrderDto.deliveryAddress;
    const orderUser = await this.orderRepository.save(order);
      if(createOrderDto.orderProduct){
        for (let element of createOrderDto.orderProduct) {
            await this.addProduct(
              element.productId,
              element.quantity,
              order.userId
          )
        }
    }
    return orderUser;
    }


  async addProduct(productId: number, quantity: number, userId: string): Promise<OrderProduct[]>{
    const order = await this.getOrderByUser(userId);
    if(!order){ 
      throw new NotFoundException('Замовлення користувача не знайдено!');
    }

    const product = await this.productService.getProductWithoutInfo(productId);
    if(!product){ 
      throw new NotFoundException('Такого товару немає!');
    }

    const orderProduct = new OrderProduct();
    orderProduct.orderId = order.id;
    orderProduct.productId = product.id;
    orderProduct.quantity = quantity;
    orderProduct.price = quantity * product.price;

    order.fullPrice = order.fullPrice + orderProduct.price;
    await this.orderRepository.save(order);
    await this.orderProductRepository.save(orderProduct)

    return await this.getOrderProductbyUser(userId);
  }

  async updateOrderProduct(orderProductUpdateDto: OrderProductUpdateDto, userId: string): Promise<OrderProduct[]>{
    if(orderProductUpdateDto.quantity < 1){
      orderProductUpdateDto.quantity = 1;
    }

    const order = await this.getOrderByUser(userId);
    if(!order){ 
      throw new NotFoundException('Замовлення користувача не знайдено!');
    }

    const orderProduct = await this.getOrderProductByOrderIdProductId(order.id, orderProductUpdateDto.productId);
    if(!orderProduct){ 
      throw new NotFoundException('Товар не знайден!');
    }

    const productPrice = orderProduct.price / orderProduct.quantity;
    order.fullPrice = order.fullPrice - orderProduct.price;

    orderProduct.quantity = orderProductUpdateDto.quantity;
    orderProduct.price = orderProductUpdateDto.quantity * productPrice;
    order.fullPrice = order.fullPrice + orderProduct.price;
    await this.orderRepository.save(order);
    await this.orderProductRepository.save(orderProduct);

    return await this.getOrderProductbyUser(userId);
  }

  async deleteProduct(productId: number, userId: string): Promise<OrderProduct[]>{
    const order = await this.getOrderByUser(userId);
    if(!order){ 
      throw new NotFoundException('Замовлення користувача не знайдено!');
    }

    const orderProduct = await this.getOrderProductByOrderIdProductId(order.id, productId);
    if(!orderProduct){ 
      throw new NotFoundException('Такого товару немає!');
    }

    order.fullPrice = order.fullPrice - orderProduct.price;
    
    await this.orderProductRepository.delete(orderProduct.id);
    await this.orderRepository.save(order);

    return await this.getOrderProductbyUser(userId);
  }

  async getOrderProductByOrderIdProductId(orderId: number, productId: number ) {
    return this.orderProductRepository.findOne({ where: { 
      orderId: orderId,
      productId: productId, 
    }});
  }

  async getOrderByUser(userId: string): Promise<Order | undefined> {
    return this.orderRepository.findOne({ where: { 
      userId: userId 
    }});
  }

  async getOrderProductbyUser(userId: string): Promise<OrderProduct[] | undefined> {
    return await this.orderProductRepository.createQueryBuilder("orderProduct")
    .select(['order.fullPrice', 'order.createdAt', 'order.orderStatus', 'order.city', 'order.deliveryAddress',  
    'orderProduct.id','orderProduct.quantity', 'orderProduct.price', 'product.name', 'product.image'])
    .leftJoin("orderProduct.order", "order")
    .leftJoin("orderProduct.product", "product")
    .where("order.userId = :id", { id: userId })
    .getMany()
  }
}
