import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'src/typeorm/Team';
import { QueryBuilder, Repository } from 'typeorm';
import { User } from 'src/typeorm/User';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TeamService {

  constructor(@InjectRepository(Team) private readonly teamRepo : Repository<Team>,
              @Inject(UserService) private readonly userService : UserService){}

  async addNewTeam(createTeamDto : CreateTeamDto){
    //checking for the coach first 
    const coachName = createTeamDto.main_name_coch
    const found = await this.userService.findByName(coachName)
    if(!found ){
      throw new NotFoundException(`this coach name is not valid`)
    }
    const newTeam = await this.teamRepo.create(createTeamDto)
    return this.teamRepo.save(newTeam)
  }

  async findAll() {
    return await this.teamRepo.find()
  }

  async findPlayers(teamName: string) {
  const team = await this.teamRepo.findOne({
    where: { name: teamName },
    relations: ['users'],
  })

  if (!team) {
    throw new NotFoundException('This team name is not valid')
  }
  return team.users
}
  async update(teamId: number, updateTeamDto: UpdateTeamDto) {
    const team = await this.teamRepo.find({where : {id : teamId}})
    if (!team) {
    throw new NotFoundException('This team name is not found')
  }
  return await this.teamRepo.update(teamId,updateTeamDto)
  }

  async remove(teamId: number) {
    const team = await this.teamRepo.find({where : {id : teamId}})
    if (!team) {
    throw new NotFoundException('This team name is not found')
  }
  return this.teamRepo.remove(team)
  }
}
