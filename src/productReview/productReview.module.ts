import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductReview from 'src/entity/ProductReview';
import { ProductReviewController } from './productReview.controller';
import { ProductReviewService } from './productReview.service';


@Module({
  imports: [TypeOrmModule.forFeature([ProductReview])],
  controllers: [ProductReviewController],
  providers: [ProductReviewService],
  exports: [ProductReviewService]
})
export class ProductReviewModule {}