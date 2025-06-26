import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from 'src/typeorm/Product';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[TypeOrmModule.forFeature([Product]),MulterModule.register()],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
