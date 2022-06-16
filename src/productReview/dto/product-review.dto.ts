import { IsNotEmpty } from "class-validator";

export default class ProductReviewDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  productId: number;
  
  @IsNotEmpty()
  userId: string;
}