import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Role } from 'src/enums/roles';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/addTeam')
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.addNewTeam(createTeamDto);
  }

  @Get('/allTeams')
  findAll() {
    return this.teamService.findAll();
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/teamplayers/:teamName')
  findOne(@Param('teamName') name: string) {
    return this.teamService.findPlayers(name);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('/updateTeam/:id')
  update(@Param('id') id: number, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('/deleteTeam/:id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(+id);
  }
}
