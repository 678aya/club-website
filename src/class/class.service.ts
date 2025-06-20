import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/typeorm/Class';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ClassService {
  constructor(@InjectRepository(Class) private readonly classRepo : Repository<Class>,
              @Inject(UserService) private readonly userService : UserService){}

  async create(createClassDto: CreateClassDto) {
    const coachName = createClassDto.main_coach_name
    const found =await  this.userService.findByName(coachName)
    if(!found ){
          throw new NotFoundException(`this coach name is not valid`)
        }

        const newClass = await this.classRepo.create(createClassDto)
        return this.classRepo.save(newClass)
  }

  async findAll() {
    return await this.classRepo.find()
  }

  async findPlayers(className : string){
    const getClass = await this.classRepo.findOne({
    where: { name: className },
    relations: ['users'], 
  })
  if(!getClass){
    throw new NotFoundException('this class is not valid')
  }
  return getClass.registerations
  }

  async update(classId : number, updateClassDto: UpdateClassDto) {
    const getClass = await this.classRepo.findOne({where :{id : classId}})
    if(!getClass){
      throw new NotFoundException('the class is not valid for updating')
    }
    return await this.classRepo.update(classId,updateClassDto)
  }

  async remove(classId : number) {
    const getClass = await this.classRepo.findOne({where :{id : classId}})
    if(!getClass){
      throw new NotFoundException('the class is not valid for updating')
    }
    return this.classRepo.remove(getClass)
  }
}
