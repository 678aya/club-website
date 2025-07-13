import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Competition_Team } from "./Competition_Team";

@Entity({name : "competitions"})
export class Competition{

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column()
    location : string

    @Column()
    bookingPrice : number 

    @Column()
    date : Date
    
    @OneToMany(()=>Competition_Team,(Competition_Team)=>Competition_Team.competition)
    compRegisteration : Competition_Team[]
}