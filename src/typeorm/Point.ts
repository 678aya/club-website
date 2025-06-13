import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name:'points'})
export class Point{
    @PrimaryGeneratedColumn()
    id : number

    @Column({default : 0})
    value : number

    @CreateDateColumn()
    createdAt : Date

    @OneToOne(()=>User , (User)=> User.point , {cascade : true})
    @JoinColumn()
    user : User[]
}