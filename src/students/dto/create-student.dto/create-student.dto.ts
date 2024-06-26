import { IS_LENGTH, IsNumber, IsString } from "class-validator";

export class CreateStudentDto {



    @IsString()
    readonly name : string ;
    
    
    @IsNumber()
    readonly age : number ;

    
    @IsString({each:true })
    readonly adresse :string[] ; 

    @IsString({each:true })
    readonly courses :string[] ; 


}
