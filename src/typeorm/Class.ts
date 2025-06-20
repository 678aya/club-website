import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Class_User } from "./Class_User";

@Entity({name : 'classes'})
export class Class{
    @PrimaryGeneratedColumn()
    id : number 

    @Column()
    name : string 

    @Column()
    startTime : Date

    @Column()
    endTime : Date

    @Column({default:'not specefied'})
    main_coach_name : string

    @CreateDateColumn()
    createdAt : Date

    @OneToMany(()=>Class_User,(class_user)=>class_user.class)
    registerations : Class_User[]
}