
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";
import { text } from "stream/consumers";
import { Category } from "src/enums/Category";

@Entity({name:"products"})
export class Product{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column({type:'enum',enum:Category})
    category : Category

    @Column()
    price : number

    @Column({type : 'text' , nullable : true})
    details : string

    @Column()
    amount : number

    @Column({default:''})
    photoPath : string

    @OneToMany(()=>Order,(order)=>order.product)
    orders : Order[]
}