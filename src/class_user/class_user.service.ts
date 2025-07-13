import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassUserDto } from './dto/create-class_user.dto';
import { UpdateClassUserDto } from './dto/update-class_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class_User } from 'src/typeorm/Class_User';
import { Repository } from 'typeorm';
import { ClassService } from 'src/class/class.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ClassUserService {
  constructor(@InjectRepository(Class_User) private readonly cuRepo : Repository<Class_User>,
              @Inject(ClassService) private readonly classServ: ClassService,
              @Inject(UserService) private readonly userServ : UserService){}


  async addUserToClass(userId : number ,createClassUserDto: CreateClassUserDto) {
    const foundClass = await this.classServ.findByName(createClassUserDto.className)
    const foundUser =await  this.userServ.findById(userId)
    if(!foundClass || !foundUser){
      throw new NotFoundException('invalid information')
    }
    const newMember = this.cuRepo.create({class: foundClass,
                                          user:foundUser,
                                         className : foundClass.name,
                                         userName : foundUser.name 
    })
    return await this.cuRepo.save(newMember)
  }

  findAll() {
    return `This action returns all classUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classUser`;
  }

  update(id: number, updateClassUserDto: UpdateClassUserDto) {
    return `This action updates a #${id} classUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} classUser`;
  }
}
