import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Class } from "./Class";
import { User } from "./User";

@Entity()
export class Class_User{
    @PrimaryGeneratedColumn()
    id : number 

    @ManyToOne(()=>Class,(Class)=>Class.registerations)
    class : Class

    @ManyToOne(()=>User,(user)=>user.registrations)
    user : User
}