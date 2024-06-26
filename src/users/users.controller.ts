import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
 
import { Roles } from "src/auth/roles/roles.decorator"; 
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { RoleGuard } from "src/auth/role/role.guard";
import { UserEntity } from "./entities/user.entity";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
   //get all users
   @Get()
   async findAll(): Promise< UserEntity[] > {
     return  this.usersService.findAll();
   }
 
   
   @Post('login')
   @HttpCode(HttpStatus.OK)
   signIn(@Body() signInDto: Record<string, any>) {
    // console.log(signInDto)
   return this.usersService.signIn(signInDto.userName, signInDto.password);
   }

  //create user
  @Post()
  async create(@Body() user): Promise<UserEntity> {
    return this.usersService.create(user);
  }


  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('profile')
  profile(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(req.user);



  }
 
}