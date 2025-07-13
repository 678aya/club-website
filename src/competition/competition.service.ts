import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { Competition } from 'src/typeorm/Competition';
import { Between, Repository } from 'typeorm';

@Injectable()
export class CompetitionService {
  constructor(@Inject(Competition) private readonly compRepo : Repository<Competition>){}

  async create(createCompetitionDto: CreateCompetitionDto) {
    const newComp = this.compRepo.create(createCompetitionDto)
    if(!newComp){
      throw new BadRequestException('NOT CREATED !!!')
    }
    return await this.compRepo.save(newComp)
  }

  async findAll() {
    const competitions = await this.compRepo.find()
    return competitions
  }

  async findByName(namepara : string){
    const found = await this.compRepo.find({ where : { name : namepara} })
    if(!found){
      throw new NotFoundException(`THE COMPETITION WITH THE NAME ${namepara} NOT FOUND!!!`)
    }
    return found 
  }

  async findByDate(datepara : string){
    const today = new Date()
    const targetDay = new Date(datepara)
    const found = await this.compRepo.find({ where : { date : Between(today , targetDay)} })
    if(!found){
      throw new NotFoundException(`THERE IS NO COMPETITION !!!`)
    }
    return found
  }

  async update(idpara : number, updateCompetitionDto: UpdateCompetitionDto) {
     const found = await this.compRepo.findOne({where : { id : idpara }})
     if(!found){
      throw new NotFoundException(`THE COMPETITION WITH THE id ${idpara} NOT FOUND!!!`)
    }
    return await this.compRepo.update(idpara,updateCompetitionDto)

  }

  async remove(idpara : number) {
    const deleteItem = await this.compRepo.findOne({ where : { id : idpara}})
    if(!deleteItem){
      throw new NotFoundException(`THE COMPETITION WITH THE id ${idpara} NOT FOUND!!!`)
    }
    const removed = await this.compRepo.remove(deleteItem)
    return removed
  }
}
