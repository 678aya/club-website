import { PartialType } from '@nestjs/swagger';
import { CreateCompetitionDto } from './create-competition.dto';

export class UpdateCompetitionDto extends PartialType(CreateCompetitionDto) {
    name ?: string 

    location ?: string 

    bookingPrice ?: number 

    date ?: Date
}
