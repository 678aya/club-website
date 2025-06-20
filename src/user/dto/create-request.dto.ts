import { IsEmail, IsString } from "class-validator"

export class CreateRequestDto{


    @IsString()
    phone : string
    
    @IsEmail()   
    email : string
     
    file : string
      
    response ?: boolean
    
}