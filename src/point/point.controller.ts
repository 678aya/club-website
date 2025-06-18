import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PointService } from './point.service';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/roles';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)      
  @Post('/addPoints/:id')
  create(@Param('id') id : number ,@Body() createPointDto: CreatePointDto) {
    return this.pointService.awardPoints(id ,createPointDto);
  }

  @Roles(Role.Admin,Role.Player,Role.Coach)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard) 
  @Get('/:id')
  getUserPointTotal(@Param('userId') userId : number) {
    return this.pointService.getUserPointTotal(userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pointService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePointDto: UpdatePointDto) {
  //   return this.pointService.update(+id, updatePointDto);
  // }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pointService.remove(+id);
  }
}
