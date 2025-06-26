import { Type } from "class-transformer"
import { IsEmail, IsString } from "class-validator"

export class CreateRequestDto{


    @IsString()
    phone : string
    
    @IsEmail()
    @Type(()=>IsEmail)   
    email : string
      
    response ?: boolean

    filePath ?: string
    
}