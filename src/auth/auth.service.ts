import { Injectable, NotFoundException } from '@nestjs/common';
import{faker} from '@faker-js/faker';
import { IAuthenticate, Role } from './interface/Role';
import {  AuthenticateDto } from './dto/authenticate.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {

    users=[
        {
            id: faker.datatype.uuid(),
            userName:"adem",
            password: "123456",
            role:Role.Admin,
        },
        {           
            id: faker.datatype.uuid(),
            userName:"ranim",
            password: "1234567",
            role:Role.User,

        }

    ]


    authenticate (authenticateDto : AuthenticateDto):IAuthenticate {
        const user = this.users.find((u)=>
            u.userName=== authenticateDto.userName &&
            u.password === authenticateDto.password
        );

        if (!user)
            throw new NotFoundException('invalid credentials');
        
        const token = sign ({...user},"secrete");
        return { token , user}

        

    }





}
