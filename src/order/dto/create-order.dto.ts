import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    amount : number

    usePoint : boolean

    @IsNumber()
    totalPrice ?: number
}
