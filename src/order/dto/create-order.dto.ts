import { IsNotEmpty } from "class-validator";
import OrderProduct from "src/entity/OrderProduct";
import UserInfoDto from "src/user/dto/user-info.dto";
import OrderProductDto from "./order-product.dto";

export default class CreateOrderDto {
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  deliveryAddress: string;

  userInfoDto: UserInfoDto;

  orderProduct: OrderProductDto[];
}