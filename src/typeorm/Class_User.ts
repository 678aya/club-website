import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Class } from "./Class";
import { User } from "./User";

@Entity()
export class Class_User{
    @PrimaryGeneratedColumn()
    id : number 

    @Column()
    className : string 

    @Column()
    userName : string 

    @ManyToOne(()=>Class,(Class)=>Class.registerations , {cascade : true})
    class : Class

    @ManyToOne(()=>User,(user)=>user.registrations, {cascade : true})
    user : User
}