import { IsString } from "class-validator";
import { Class } from "src/typeorm/Class";
import { User } from "src/typeorm/User";

export class CreateClassUserDto {
    class ?: Class

    user : User

    @IsString()
    className : string 

    @IsString()
    userName ?: string
}
