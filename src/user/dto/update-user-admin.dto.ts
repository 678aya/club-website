import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {IsEnum, IsString } from 'class-validator';
import { Role } from 'src/enums/roles';
import { IsNull } from 'typeorm';

export class UpdateUserAdminDto extends PartialType(CreateUserDto) {
        @IsEnum({enum:'Role'})
        role?:Role

        @IsString()
        SkillOrExperienceLevel ?: string 

        hashedRefreshToken ?: string
}
