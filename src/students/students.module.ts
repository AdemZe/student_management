import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Students } from './entities/students.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Students,Course]),],
    controllers:[StudentsController,],
    providers : [StudentsService,],
    exports:[]
})
export class StudentsModule {}
