import { BadRequestException, Body, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import {Raw, Repository } from 'typeorm';
import { Role } from 'src/enums/roles';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { JoinRequest } from 'src/typeorm/JoinRequests';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/updateRequest.dto';

@Injectable()
export class UserService {
  constructor(
              @InjectRepository(User) private readonly UserRepo : Repository<User>,
              @InjectRepository(JoinRequest) private readonly joinRepo : Repository<JoinRequest>){}

  async signUp(createUserDto: CreateUserDto) {
    const user = this.UserRepo.create(createUserDto)
    if(!user){
      throw new BadRequestException('THE USER COULD NOT BE CREATED!')
    }
    return await this.UserRepo.save(user)
  }

  
  async findByEmail(email : string) {
    const user = await this.UserRepo.findOne({
      where : {email : email}
    })
    if(!user){
      throw new NotFoundException(`THE USER WITH THE EMAIL :${email}  NOT FOUND!!`)
    }
    return user
  }

  async findByName(namep : string){
    const user = await this.UserRepo.findOne({ where: { name: Raw((alias) => `LOWER(${alias}) LIKE LOWER('%${namep}%')`) } });
    if(!user){
      throw new NotFoundException(`THER IS NO USER WITH THE NAME :${namep}`)
    }
    return user
  }

  async findByRole(rolep : Role){
    const user = await this.UserRepo.find({ where:{role : rolep}})
    if(!user || (await user).length==0 ){
      throw new NotFoundException(`THERE ARE NO USERS WITH THE ROLE :${rolep}`)
    }
    return user
  }

  async findById(userid : number){
    const user = await this.UserRepo.findOne({where :{id : userid}})
    if(!user){
      throw new NotFoundException('user not found')
    }
    return user
  }

  async findAll(){
    const users = await this.UserRepo.find()
    return users
  }


  async update(id: number, updateDto: UpdateUserDto | UpdateUserAdminDto) {
    const user = await this.UserRepo.update(id,updateDto)
    if (!user) {
    throw new NotFoundException(`User with ID ${id} not found.`);
  }
    return user
  }

  async remove(id: number) {
    const user = await this.UserRepo.find({where:{id : id}})
    if (!user) {
    throw new NotFoundException(`User with ID ${id} not found.`);
  }
    return await this.UserRepo.remove(user)
  }

  async sendJoinRequest(id : number ,createRequestDto : CreateRequestDto , file : Express.Multer.File){
    console.log(file)
    createRequestDto.filePath = `./cvs/${file.filename}`
    const user = await this.UserRepo.findOne({where:{id : id}})
    if (!user) {
    throw new NotFoundException(`User with ID ${id} not found.`);
  }

  console.log(user)
    const request = await this.joinRepo.create({...createRequestDto,user:user})
    return await this.joinRepo.save(request)
  }

  async updateRequest(reqId: number, updateDto: UpdateRequestDto , file : Express.Multer.File) {
    updateDto.filePath = `./cvs/${file.filename}`
   const request = this.joinRepo.find({ where : {id : reqId}})
   if(!request){
    throw new NotFoundException(`this request ${reqId} not found`)
   }
   return await this.joinRepo.update(reqId,updateDto)
  }
}
