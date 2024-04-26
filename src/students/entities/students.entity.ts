import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity()
export class Students {

    @PrimaryGeneratedColumn()
    id : number ;
    
    
    @Column()
    name : string ;
    
    @Column()
    age : number ;
   
    
    @Column("json",{ nullable:true })
    adresse :string[] ; 


    @JoinTable()
    @ManyToMany(type => Course , Course => Course.students, {cascade: true})
    courses: Course[];   





}