import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/roles';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('competition')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/addCompetition')
  create(@Body() createCompetitionDto: CreateCompetitionDto) {
    return this.competitionService.create(createCompetitionDto);
  }

  @Get('/AllCompetitions')
  findAll() {
    return this.competitionService.findAll();
  }

  @Get('/searchByName/:name')
  findByName(@Param('name') name: string) {
    return this.competitionService.findByName(name)
  }

  @Get('/searchByDate/:date')
  findByDate(@Param('date') date: string) {
    return this.competitionService.findByDate(date)
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/addCompetition')
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateCompetitionDto: UpdateCompetitionDto) {
    return this.competitionService.update(+id, updateCompetitionDto);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/addCompetition')
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.competitionService.remove(+id);
  }
}
