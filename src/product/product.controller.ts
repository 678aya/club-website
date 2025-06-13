import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/enums/Category';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('/allProducts')
  findAll() {
    return this.productService.findAll();
  }

  @Get('/searchName/:name')
  findByName(@Param('name') name: string) {
    return this.productService.findByName(name);
  }

  @Get('/searchCategory/:category')
  findByCategory(@Param('category') category : Category) {
    return this.productService.findByCategory(category);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
