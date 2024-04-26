import { IsEmail, IsNotEmpty, IsString, } from "class-validator";

export class AuthenticateDto {
    
    
    @IsNotEmpty()
    @IsString()
    readonly userName: string ;
    
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string ;
     

    @IsNotEmpty()
    @IsString()
    readonly password :string ; 




}  