
import { IsEnum } from "class-validator"
import { Type } from "src/enums/Type"

export class CreateTeamDto {
    name : string

    main_coach_name : string

    @IsEnum({enum:'Type'})
    type : Type
}
