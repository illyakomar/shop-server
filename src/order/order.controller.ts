import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ForAuthorized, ForRoles, GetUser } from 'src/auth/role-auth.decorators';
import Order from 'src/entity/Order';
import OrderProduct from 'src/entity/OrderProduct';
import User from 'src/entity/user';
import { OrderService } from './order.service';
import OrderProductUpdateDto from './dto/order-product-update.dto';
import CreateOrderDto from './dto/create-order.dto';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/other/role.enum';

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

  @ForAuthorized()
  @ForRoles(Role.Admin, Role.Moder)
  @Post('update/:id')
  async updateOrderProduct(
    @Body() orderProductUpdateDto: OrderProductUpdateDto,
    @Param('id') id: string
    ): Promise<OrderProduct[]>{
   return await this.orderService.updateOrderProduct(orderProductUpdateDto, id);
  }

  @Delete('delete/:productId')
  async deleteProductInOrder(
    @Param('productId') productId: number,
    @GetUser() user: User
    ): Promise<OrderProduct[]> {
    return await this.orderService.deleteProduct(productId, user.id);
  }

  @ForAuthorized()
  @ForRoles(Role.Admin, Role.Moder)
  @Get('getOrder/:id')
  async getOrderByUserId(@Param('id') id: string): Promise<OrderProduct[] | undefined> {
    const order = await this.orderService.getOrderProductbyUser(id);
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }

  @ForAuthorized()
  @ForRoles(Role.Admin, Role.Moder)
  @Get('all')
  async getAllOrder(): Promise<Order[] | undefined> {
    return await this.orderService.getAllOrders();
  }

  @ForAuthorized()
  @Get('getOwnOrder')
  async getOrderProductbyUser(
    @GetUser() user: User
  ): Promise<OrderProduct[] | undefined> {
    return await this.orderService.getOrderProductbyUser(user.id);
  }
}
