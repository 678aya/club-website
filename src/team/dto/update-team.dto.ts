import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import { IsEnum } from 'class-validator';
import { Type } from 'src/enums/Type';


export class UpdateTeamDto extends PartialType(CreateTeamDto) {
    name ?: string
    
    main_name_coch ?: string
    
    @IsEnum({enum:'Type'})
    type ?: Type
}
