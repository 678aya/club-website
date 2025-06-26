import { IsEmail, IsEnum, IsInt, IsNumber, IsString } from "class-validator"
import { Gender } from "src/enums/gender"
import { Role } from "src/enums/roles"
import { SubscriptionType } from "src/enums/subscription"

export class CreateUserDto {
    @IsString()
    name:string

    @IsEmail()
    @IsString()
    email:string

    @IsString()
    password:string

    @IsString()
    phone:string

    @IsEnum({enum:'Gender'})
    gender:Gender

    @IsInt()
    age:number

    @IsEnum({enum:'SubscriptionType'})
    subscription ?:SubscriptionType

    @IsEnum({enum:'Role'})
    role:Role
}
