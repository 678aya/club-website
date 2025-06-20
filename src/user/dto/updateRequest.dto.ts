import { PartialType } from "@nestjs/mapped-types";
import { CreateRequestDto } from "./create-request.dto";
import { IsEmail, IsString } from "class-validator";

export class UpdateRequestDto extends PartialType(CreateRequestDto){
        @IsString()
        phone : string
        
        @IsEmail()   
        email : string
         
        file : string
          
        response ?: boolean
        
}