import { PartialType } from "@nestjs/mapped-types";
import { CreateRequestDto } from "./create-request.dto";
import { IsEmail, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateRequestDto extends PartialType(CreateRequestDto){
        @IsString()
        phone : string
        
        @IsEmail() 
        @Type(()=>IsEmail)   
        email : string
          
        response ?: boolean

        filePath ?: string
        
}