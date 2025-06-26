import { Type } from "class-transformer"
import { IsEnum, IsNumber, IsString } from "class-validator"
import { Category } from "src/enums/Category"

export class CreateProductDto {
        @IsString()
        name : string
    
        @IsEnum({enum:'Category'})
        category : Category
    
        @IsNumber()
        @Type(()=>Number)
        price : number

        @IsNumber()
        amount : number
    
        details : string

        photoPath ?: string 
}
