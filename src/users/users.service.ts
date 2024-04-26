
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"; 
import { Repository } from "typeorm";
import { sign } from 'jsonwebtoken';
import { UserEntity } from "./entities/user.entity";
import { IAuthenticate, Role } from "src/auth/interface/Role";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
 

  async signIn( userName: string, pass: string): Promise<any> {
     
    const userr = await this.userRepository.findOne( { where:{ "username" : userName } } );
    if (userr?.password !== pass) { 
      throw new NotFoundException('Invalid credentials');
    } 

 
      const token = sign({ ...userr }, 'secrete');
/*
      const user ={

        id:userr.userUUID,
        password:userr.password,
        userName:userr.username,
        role:Role.User

      }

*/

      return  { token , userr  } ;

  } 

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async create(user: Partial<UserEntity>): Promise<UserEntity> {  
    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  }
 
}
