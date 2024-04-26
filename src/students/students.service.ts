import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Students } from './entities/students.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class StudentsService {

    constructor (@InjectRepository(Students) 
    private readonly studentsRepo :Repository  <Students> ,
    @InjectRepository(Course) 
    private readonly courseRepo :Repository  <Course> ) 
    {}




    /*studentsTab : Students[] =[

        {
            id : 1 ,
            name : "bey" ,
            age : 18 ,
            adresse :["beni khalled"]  
        },

        {
            id : 2 ,
            name : "adem" ,
            age : 22 ,
            adresse :["beni khalled","charguia "]  
        },
        
        {
            id : 3 ,
            name : "wale" ,
            age : 22 ,
            adresse :["sousse","mourouj  "]  
        }

    ] */



    
    async findALL()  : Promise<Students[]>  {
        return this.studentsRepo.find(
            { relations : ['courses'] }
        ) ;
    }

    
    async create( createStudentDto : CreateStudentDto ){

        const courses = await Promise.all (createStudentDto.courses.map(x=> this.preloadCourseByName(x))) 
        const newStudent={ ...createStudentDto , courses };



        this.studentsRepo.create(newStudent);
        return this.studentsRepo.save(newStudent);

    }


    async findUser(id: number  ) : Promise <Students>  {
        const student= this.studentsRepo.findOne({where :{id}})  ;
        if ( ! student ){
         //throw new HttpException("id not found  ", HttpStatus.NOT_FOUND)
            throw new NotFoundException(` the student with ${id} id  not found `     )
        }
    return student
    }



    async remove(id:string ){
        await this.studentsRepo.delete(id)
    }


    async update(  id:number , updateStudentDto : UpdateStudentDto  ): Promise <Students> {
        const courses = updateStudentDto.courses && 
        (await Promise.all (updateStudentDto.courses.map(x=>this.preloadCourseByName(x)))) 
        const updateStudent = await this.studentsRepo.preload({
        id:+id,
        ...updateStudentDto,
        courses
      })
      if (!updateStudent){
        throw new NotFoundException(`${id} id not found to remove user  `)
      }
      
      return this.studentsRepo.save(updateStudent);
    }


    private async preloadCourseByName(name: string ): Promise <Course>{

       const course = await this.courseRepo.findOne({
        where : {name}
       }) 
       if (course){
        return course
       }
       return this.courseRepo.create({name});



    }










}
