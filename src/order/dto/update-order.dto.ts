import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { Product } from 'src/typeorm/Product';
import { IsNumber } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    product : Product

    @IsNumber()
    amount : number
}
