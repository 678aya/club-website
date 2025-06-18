import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/enums/roles';
import { LocalAuthGuard } from 'src/auth/guards/local-auth/local-auth.guard';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { plainToClass } from 'class-transformer';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard) 
  @Get('/allUsers')
  findAll() {
    return this.userService.findAll();
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/searchName/:name')
  findByName(@Param('name') name: string) {
    return this.userService.findByName(name);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/searchRole/:role')
  findByRole(@Param('role') role: Role) {
    return this.userService.findByRole(role);
  }


@Roles(Role.Admin,Role.Coach,Role.Player)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Patch('/update/:id')
updateUser(@Request() req, @Param('id') id: string, @Body() body: any) {
  const isAdmin = req.user?.role === 'admin';
  const dto = isAdmin ? plainToClass(UpdateUserAdminDto, body) : plainToClass(UpdateUserDto, body);
  return this.userService.update(+id, dto);
}

@Roles(Role.Admin)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
