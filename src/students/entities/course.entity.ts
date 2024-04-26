import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Students } from "./students.entity";

@Entity()
export class Course{


    @PrimaryGeneratedColumn()
    id : number ;

    
    @Column()
    name: string ;


    @ManyToMany( type =>Students , Students=> Students.courses  )
    students:Students[]

}