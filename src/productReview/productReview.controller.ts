import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ForAuthorized, GetUser } from "src/auth/role-auth.decorators";
import ProductReview from "src/entity/ProductReview";
import User from "src/entity/user";
import ProductReviewDto from "./dto/product-review.dto";
import { ProductReviewService } from "./productReview.service";

@Controller('productReview')
export class ProductReviewController {
  constructor(private productReviewService: ProductReviewService){}
  
  @ForAuthorized()
  @Post('addReview')
  public async addReview(
    @GetUser() user: User,
    @Body() productReviewDto: ProductReviewDto,
  ): Promise<ProductReview> {
    productReviewDto.userId = user.id;  
    return await this.productReviewService.addReview(productReviewDto);
  }

  @Get('getReviews/:productId')
  public async getReviewsProduct(
    @Param('productId') productId,
  ): Promise<ProductReview[]> {
    return await this.productReviewService.getAllByProductId(productId);
  }

}