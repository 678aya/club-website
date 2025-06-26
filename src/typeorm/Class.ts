import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Class_User } from "./Class_User";

@Entity({name : 'classes'})
export class Class{
    @PrimaryGeneratedColumn()
    id : number 

    @Column()
    name : string 

    @Column({type : 'time',default:"00:00:00"})
    startTime : string

    @Column({type : 'time',default:"00:00:00"})
    endTime : string

    @Column({default:'not specefied'})
    main_coach_name : string

    @CreateDateColumn()
    createdAt : Date

    @OneToMany(()=>Class_User,(class_user)=>class_user.class)
    registerations : Class_User[]
}