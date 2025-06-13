import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsEnum, IsInt, IsString } from 'class-validator';
import { Gender } from 'src/enums/gender';
import { SubscriptionType } from 'src/enums/subscription';
import { Role } from 'src/enums/roles';

export class UpdateUserDto extends PartialType(CreateUserDto) {
        @IsString()
        name?:string
    
        @IsEmail()
        @IsString()
        email?:string
    
        @IsString()
        password?:string
    
        @IsString()
        phone?:string
    
        @IsEnum({enum:'Gender'})
        gender?:Gender
    
        @IsInt()
        age?:number
    
        @IsEnum({enum:'SubscriptionType'})
        subscription?:SubscriptionType
    
        @IsEnum({enum:'Role'})
        role?:Role
}
