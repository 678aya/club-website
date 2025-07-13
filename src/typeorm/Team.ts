import { Type } from "src/enums/Type";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Competition_Team } from "./Competition_Team";

@Entity({name : 'Teams'})
export class Team{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column({default:'not specefied'})
    main_coach_name : string

    @Column({type : 'enum' , enum : Type})
    type : Type

    @CreateDateColumn()
    createdAt : Date

    @OneToMany(()=>User, (user)=>user.team)
    users : User[]

    @OneToMany(()=>Competition_Team,(Competition_Team)=>Competition_Team.team)
    teamRegisteration : Competition_Team

}