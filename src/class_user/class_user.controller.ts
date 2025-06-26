import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ClassUserService } from './class_user.service';
import { CreateClassUserDto } from './dto/create-class_user.dto';
import { UpdateClassUserDto } from './dto/update-class_user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Controller('class-user')
export class ClassUserController {
  constructor(private readonly classUserService: ClassUserService) {}

  @Roles(Role.Admin , Role.Player)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/addUserToClass')
  create(@Req() req : any ,@Body() createClassUserDto: CreateClassUserDto) {
    const isAdmin  = req.user?.role === 'Admin'
     let userId 
    if(isAdmin) {
       userId = createClassUserDto.user.id
    }else{
       userId = req.user.id
    }
    return this.classUserService.addUserToClass(userId,createClassUserDto)
  }

  @Get()
  findAll() {
    return this.classUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassUserDto: UpdateClassUserDto) {
    return this.classUserService.update(+id, updateClassUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classUserService.remove(+id);
  }
}
