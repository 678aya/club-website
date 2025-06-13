import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum, IsNumber } from 'class-validator';
import { Product } from 'src/typeorm/Product';
import { Status } from 'src/enums/status';

export class UpdateOrderAdminDto extends PartialType(CreateOrderDto) {
    product ?: Product
    
    @IsNumber()
    amount ?: number

    @IsEnum({enum:'Status'})
    status ?: Status
}
