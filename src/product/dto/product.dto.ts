import { IsNotEmpty } from "class-validator";

export default class ProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  count: number;

  @IsNotEmpty()
  specification: string;

  @IsNotEmpty({ message: 'Виберіть категорію' })
  categoryId: number;
  
  @IsNotEmpty({ message: 'Виберіть бренд' })
  brandId: number;
}