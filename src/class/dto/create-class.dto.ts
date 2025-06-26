import { IsDate, IsString, IsTimeZone, Matches } from "class-validator"

export class CreateClassDto {
    @IsString()
    name : string 

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'startTime must be in the format HH:MM:SS',
  })
    startTime : string 

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'startTime must be in the format HH:MM:SS',
  })
    endTime : string 

    @IsString()
    main_coach_name : string
}
