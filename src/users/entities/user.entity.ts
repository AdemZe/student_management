import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number ;

    @Column()
    username: string;

    @Column({ nullable:true })
    userUUID: string ;

    @Column()
    email:string;

    @Column()
    password: string;

    @Column({ nullable:true })
    role:string;


}
