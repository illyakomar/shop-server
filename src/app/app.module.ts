import { Module } from '@nestjs/common';
import envConfig from '../config/environment';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { BrandModule } from 'src/brand/brand.module';
import { CategoryModule } from 'src/category/category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envConfig.dbHost,
      port: Number(envConfig.dbPort),
      username: envConfig.dbUser,
      password: '',
      database: envConfig.dbName,
      entities: ["dist/entity/**/*.js"],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    BrandModule,
    ProductModule
  ]
})
export class AppModule {}
