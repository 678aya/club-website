import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import {Raw, Repository } from 'typeorm';
import { Role } from 'src/enums/roles';
import { Order } from 'src/typeorm/Order';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly UserRepo : Repository<User>){}

  async create(createUserDto: CreateUserDto) {
    const user = this.UserRepo.create(createUserDto)
    if(!user){
      throw new BadRequestException('THE USER COULD NOT BE CREATED!')
    }
    return await this.UserRepo.save(user)
  }

  findAll() {
    return this.UserRepo.find()
  }

  async findByName(namep : string){
    const user = await this.UserRepo.find({ where: { name: Raw((alias) => `LOWER(${alias}) LIKE LOWER('%${namep}%')`) } });
    if(!user || (await user).length==0 ){
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.UserRepo.update(id,updateUserDto)
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
    return this.UserRepo.remove(user)
  }
}
