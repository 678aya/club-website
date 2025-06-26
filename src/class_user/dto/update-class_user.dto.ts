import { PartialType } from '@nestjs/mapped-types';
import { CreateClassUserDto } from './create-class_user.dto';
import { IsString } from 'class-validator';
import { User } from 'src/typeorm/User';
import { Class } from 'src/typeorm/Class';

export class UpdateClassUserDto extends PartialType(CreateClassUserDto) {
    class ?: Class
    
    user ?: User
    
    @IsString()
    className ?: string 
    
    @IsString()
    userName ?: string
}
