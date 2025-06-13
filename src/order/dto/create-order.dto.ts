import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    amount : number

    @IsNotEmpty()
    usePoint : boolean

    @IsNumber()
    totalPrice ?: number
}
