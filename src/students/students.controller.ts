import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('students')
export class StudentsController {
  constructor( private readonly  studentsService: StudentsService      ) {}


  @Roles("user")
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Get()
  findAllUsers(){
    return this.studentsService.findALL();
  }


  @Post()
  createUsers(@Body() createStudentDto : CreateStudentDto  ){
    return this.studentsService.create(createStudentDto);

  }


  @Get(":id")
  findUserById(  @Param("id") id:number      ){
        return this.studentsService.findUser(id);


  }



  @Patch(":id")
  updateUser(    @Param("id") id :number    ,   @Body()  updateStudentDto  : UpdateStudentDto   ){
            return  this.studentsService.update( id , updateStudentDto );

   }


  @Delete(":id")
  removeUser(  @Param( "id" ) id :string       ){
    return this.studentsService.remove(id);
  }





}
