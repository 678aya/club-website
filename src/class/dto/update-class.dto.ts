import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDto } from './create-class.dto';
import { IsDate, IsString } from 'class-validator';

export class UpdateClassDto extends PartialType(CreateClassDto) {
    @IsString()
    name ?: string 
    
    @IsDate()
    startTime ?: Date
    
    @IsDate()
    endTime ?: Date
    
    main_coach_name ?: string
}
