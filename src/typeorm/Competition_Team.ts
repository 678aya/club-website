import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Competition } from "./Competition";
import { Team } from "./Team";

@Entity()
export class Competition_Team{
    @PrimaryGeneratedColumn()
    id : number 

    @ManyToOne(()=>Competition , (Competition)=>Competition.compRegisteration)
    competition : Competition

    @ManyToOne(()=>Team , (Team)=>Team.teamRegisteration)
    team : Team
}