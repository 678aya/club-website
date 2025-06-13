import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/Product';
import { IsNull, Raw, Repository } from 'typeorm';
import { Category } from 'src/enums/Category';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly ProductRepo : Repository<Product>){}

  async create(createProductDto: CreateProductDto) {
    const product = this.ProductRepo.create(createProductDto)
    if(!product){
      throw new BadRequestException(`THE PRODUCT ${product} COULD NOT BE ADDED `)
    }
    return await this.ProductRepo.save(product)
  }

  findAll() {
    return this.ProductRepo.find()
  }

  async findByName(productp : string){
    const product = await this.ProductRepo.find({where:{name: Raw((alias) => `LOWER(${alias}) LIKE LOWER('%${productp}%')`)}})
    if(!product){
      throw new NotFoundException(`THE PRODUCT ${productp} NOT FOUNDED!!!`)
    }
    return product
  }

  async findByCategory(categoryp : Category){
    const product = await this.ProductRepo.find({where : {category : categoryp}})
    if(!product){
      throw new NotFoundException(`THE ${categoryp} NOT FOUNDED!!!`)
    }
    return product
  }
  
  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.ProductRepo.update(id ,updateProductDto)
    if(!product){
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return product
  }

  async remove(id: number) {
    const product = await this.ProductRepo.find({where : {id : id}})
    if(!product){
      throw new NotFoundException(`PRODUCT with ID ${id} not found.`);
    }
    return this.ProductRepo.remove(product)
  }
}
