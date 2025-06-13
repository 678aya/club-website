import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from 'src/typeorm/Point';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/User';

@Injectable()
export class PointService {
  constructor(@InjectRepository(Point) private readonly pointRepo : Repository<Point>,
              @InjectRepository(User) private readonly userRepo : Repository<User>){}

  async awardPoints(userId : number , createPointDto : CreatePointDto){
    const user = await this.userRepo.find({ where : { id : userId }})
    if(!user){
          throw new BadRequestException('THE USER COULD NOT BE FOUND !!!')
        }
    const point = this.pointRepo.create({
      user:user,
      value : createPointDto.value
    })
    return await this.pointRepo.save(point)
  }

  getUserPointTotal(userId : number){
    const lastDate = this.pointRepo.createQueryBuilder('point')
  .select('MAX(point.createdAt)', 'lastDate')
  .where('point.userId = :userId', { userId })
  .getRawOne();
    const point = this.pointRepo.sum('value',{ user :{id : userId}}) 
    return {point , lastDate}
  }

  findAll() {
    return `This action returns all point`;
  }

  findOne(id: number) {
    return `This action returns a #${id} point`;
  }
 
  update(id: number, updatePointDto: UpdatePointDto) {
    return `This action updates a #${id} point`;
  }

  async remove(userId: number) {
    const user = await this.userRepo.find({ where : { id : userId }})
    if(!user){
          throw new BadRequestException('THE USER COULD NOT BE FOUND !!!')
        }
    const records =await this.pointRepo.createQueryBuilder()
                                        .delete()
                                        .from(Point)
                                        .where({user : user})
                                        .execute()
    return records
  }
}
