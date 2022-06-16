import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import ProductReview from "src/entity/ProductReview";
import ProductReviewDto from "./dto/product-review.dto";
import { ProductReviewService } from "./productReview.service";

@Controller('productReview')
export class ProductReviewController {
  constructor(private productReviewService: ProductReviewService){}
  
  @Post('addReview')
  public async addReview(
    @Body() productReviewDto: ProductReviewDto,
  ): Promise<ProductReview> {  
    return await this.productReviewService.addReview(productReviewDto);
  }

  @Get('getReviews/:productId')
  public async getReviewsProduct(
    @Param('productId') productId,
  ): Promise<ProductReview[]> {
    return await this.productReviewService.getAllByProductId(productId);
  }

}