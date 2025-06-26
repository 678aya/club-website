import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/typeorm/Class';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/enums/roles';
import { Class_User } from 'src/typeorm/Class_User';

@Injectable()
export class ClassService {
  constructor(@InjectRepository(Class) private readonly classRepo : Repository<Class>,
              @Inject(UserService) private readonly userService : UserService,
              @InjectRepository(Class_User) private readonly cuRepo : Repository<Class_User>){}

  async create(createClassDto: CreateClassDto) {
    const coachName = createClassDto.main_coach_name
    const found =await  this.userService.findByName(coachName)
    if(!found ){
          throw new NotFoundException(`this coach name is not valid`)
        }
       if(found.role != Role.Coach){
        throw new NotFoundException(`this coach name is not valid`)
       }

        const newClass = await this.classRepo.create(createClassDto)
        return this.classRepo.save(newClass)
  }

  async findByName(name : string){
    return  await this.classRepo.findOne({ where : { name : name}})
  }

  async findAll() {
    return await this.classRepo.find()
  }

  async findById(classId : number){
    return await this.classRepo.findOne({where : {id : classId}})
    
  }

  async findPlayers(classn : string){
    return await this.cuRepo.find({where : {className : classn}})
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
