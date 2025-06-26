import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDto } from './create-class.dto';
import { IsDate, IsString, Matches } from 'class-validator';

export class UpdateClassDto extends PartialType(CreateClassDto) {
    @IsString()
    name ?: string 
    
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'startTime must be in the format HH:MM:SS',
      })
    startTime ?: string 
    
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'startTime must be in the format HH:MM:SS',
      })
    endTime ?: string 

    main_coach_name ?: string
}
