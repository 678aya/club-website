import { IsEmail, IsInt } from "class-validator";
import { Gender } from "src/enums/gender";
import { Role } from "src/enums/roles";
import { SubscriptionType } from "src/enums/subscription";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt  from "bcrypt"
import { Order } from "./Order";
import { Point } from "./Point";

@Entity({name:'Users'})
export class User{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column({type:'enum',enum:Gender})
    gender : Gender

    @Column()
    @IsInt()
    age : number

    @Column()
    @IsEmail()
    email : string

    @Column()
    phone : string

    @Column({type:'enum',enum:Role})
    role : Role

    @Column({type:'enum',enum:SubscriptionType})
    subscriptionType : SubscriptionType

    @Column({default:'ss'})
    password : string

    @Column({default:"0"})
    SkillOrExperienceLevel : string 

    @CreateDateColumn()
    createdAt : Date

    @OneToMany(()=>Order,(order)=>order.user)
    orders : Order[]

    @OneToOne(()=>Point , (Point)=>Point.user )
    point : Point

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,10)
    }

}