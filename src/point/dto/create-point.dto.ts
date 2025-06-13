import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePointDto {
    @IsNumber()
    @IsNotEmpty()
    value : number
}
