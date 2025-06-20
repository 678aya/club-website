import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : "competitions"})
export class Competition{

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column()
    location : string

    @Column()
    bookingPrice : number 

    @Column()
    date : Date
    
}