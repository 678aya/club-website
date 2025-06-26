import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name:'joinRequests'})
export class JoinRequest{
    @PrimaryGeneratedColumn()
    id : number 

    @CreateDateColumn()
    createdAt : Date

    @Column()
    phone : string

    @Column({unique : true})
    email : string

    @Column({default:"  "})
    filePath : string

    @Column({default : false})
    response : boolean

    @OneToOne(()=>User , (User)=> User.joinRequest , {cascade : true})
    @JoinColumn()
    user : User
}