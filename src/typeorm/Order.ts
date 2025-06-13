import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";
import { Status } from "src/enums/status";

@Entity({name:'orders'})
export class Order{
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(()=>Product , (product)=>product.orders ,{cascade : true})
    product : Product

    @ManyToOne(()=>User,(user)=>user.orders ,{cascade : true})
    user : User

    @Column({type:'enum',enum:Status,default: Status.PENDING})
    status : Status

    @Column()
    amount : number 

    @Column()
    usePoint : boolean

    @Column()
    totalPrice : number

    @CreateDateColumn()
    createdAt : Date
}