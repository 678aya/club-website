import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/enums/Category';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseInterceptors(FileInterceptor('file',{
    storage : diskStorage({
      destination:'./images',
      filename(req, file, callback) {
        const prefix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const filename = `${prefix}-${file.originalname}`
        callback(null,filename)
      },
    })
  }))
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard) 
  @Post('/create')
  create(@Body() createProductDto: CreateProductDto, @UploadedFile() file : Express.Multer.File) {
    return this.productService.create(createProductDto , file);
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

  @UseInterceptors(FileInterceptor('file',{
    storage : diskStorage({
      destination:'./images',
      filename(req, file, callback) {
        const prefix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const filename = `${prefix}-${file.originalname}`
        callback(null,filename)
      },
    })
  }))
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard) 
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@UploadedFile() file : Express.Multer.File) {
    return this.productService.update(+id, updateProductDto,file);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard) 
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
