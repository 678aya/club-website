import { IsDate, IsString } from "class-validator"

export class CreateClassDto {
    @IsString()
    name : string 

    @IsDate()
    startTime : Date

    @IsDate()
    endTime : Date

    main_coach_name : string
}
