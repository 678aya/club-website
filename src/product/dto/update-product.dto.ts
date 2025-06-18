import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/enums/Category';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    name ?: string
        
    @IsEnum({enum:'Category'})
    category ?: Category
        
    @IsNumber()
    price ?: number
        
    details ?: string

    amount ?: number
}
