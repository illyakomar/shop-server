import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ForAuthorized, GetUser } from 'src/auth/role-auth.decorators';
import Order from 'src/entity/Order';
import OrderProduct from 'src/entity/OrderProduct';
import User from 'src/entity/user';
import { OrderService } from './order.service';
import OrderProductUpdateDto from './dto/order-product-update.dto';
import CreateOrderDto from './dto/create-order.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService,
    private readonly authService: AuthService,){}
  
  @ForAuthorized()
  @Post('createForAuthorized')
  async createOrderForAuthorized(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,  
  ): Promise<Order>{
    return await this.orderService.createOrder(createOrderDto, user.id);
  }

  @Post('create')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto  
  ): Promise<Order>{
    await this.authService.register(createOrderDto.userInfoDto);
    return await this.orderService.createOrder(createOrderDto, createOrderDto.userInfoDto.id);
  }

  @Post('update')
  async updateProduct(
    @Body() orderProductUpdateDto: OrderProductUpdateDto,
    @GetUser() user: User,  
    ): Promise<OrderProduct[]>{
   return await this.orderService.updateProduct(orderProductUpdateDto, user.id);
  }

  @Delete('delete/:productId')
  async delete(
    @Param('productId') productId: number,
    @GetUser() user: User
    ): Promise<OrderProduct[]> {
    return await this.orderService.deleteProduct(productId, user.id);
  }

  @Get('getOrderUser')
  async getOrderByUser(@GetUser() user: User): Promise<Order | undefined> {
    const order = await this.orderService.getOrderByUser(user.id);
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }

  @Get('getOrderProductUser')
  async getOrderProductbyUser(
    @GetUser() user: User
  ): Promise<OrderProduct[] | undefined> {
    return await this.orderService.getOrderProductbyUser(user.id);
  }
}
