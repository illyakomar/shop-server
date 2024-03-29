import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import ProductReview from "src/entity/ProductReview";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import ProductReviewDto from "./dto/product-review.dto";

@Injectable()
export class ProductReviewService {
  constructor(
    @InjectRepository(ProductReview)
    private readonly productReviewRepository: Repository<ProductReview>,
  ) { }

  async addReview(productReviewDto: ProductReviewDto): Promise<ProductReview> {
    const userReview = await this.checkIfUserHasReview(productReviewDto.productId, productReviewDto.userId);
    if (!userReview) {
      throw new BadRequestException("Помилка! Тільки один коментар на товар");
    }
    return await this.productReviewRepository.save(productReviewDto);
  }

  async getAllByProductId(productId: number): Promise<ProductReview[]> {
    return await this.productReviewRepository.find({ where: { productId: productId }, relations: ["user"] });
  }

  async getProductReviewByUserId(userId: string): Promise<ProductReview[]> {
    return await this.productReviewRepository.find({ where: { userId: userId } });
  }

  async checkIfUserHasReview(productId: number, userId: string): Promise<Boolean> {
    return await this.productReviewRepository.findOne({
      where: {
        productId: productId,
        userId: userId
      }
    }) == undefined;
  }
  
}