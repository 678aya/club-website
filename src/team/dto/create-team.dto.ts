
import { IsEnum } from "class-validator"
import { Type } from "src/enums/Type"

export class CreateTeamDto {
    name : string

    main_name_coch : string

    @IsEnum({enum:'Type'})
    type : Type
}
