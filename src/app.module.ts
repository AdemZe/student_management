import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsController } from './students/students.controller';
import { StudentsService } from './students/students.service';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { UsersModule } from './users/users.module';

@Module({
  imports: [StudentsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'postgres',
      autoLoadEntities : true, 
      synchronize: true,
    }),

    
    AuthModule,
    // pour utilise passport 
    PassportModule,
    //utiliser token 
    JwtModule.register({secret: "secrete " , signOptions: {expiresIn: "1h" }  } ),
    UsersModule,
  
  
  
  
  ],
  controllers: [AppController, ],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
