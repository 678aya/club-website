import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/enums/Category';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard) 
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

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard) 
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard) 
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
