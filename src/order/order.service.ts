import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Repository } from 'typeorm';
import { Order } from 'src/typeorm/Order';
import { Product } from 'src/typeorm/Product';
import { Point } from 'src/typeorm/Point';
import { PointService } from 'src/point/point.service';
import { UpdateOrderAdminDto } from './dto/update-admin-order.dto';
import { Status } from 'src/enums/status';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(User) private readonly userRepo : Repository<User>,
              @InjectRepository(Order) private readonly orderRepo : Repository<Order>,
              @InjectRepository(Product) private readonly productRepo : Repository<Product>,
              @InjectRepository(Point) private readonly pointRepo :Repository<Point>,
              private readonly pointServices : PointService){}

  // async createOrder(userId : number , productId : number , amount : number) {
  //   const user = await this.userRepo.find({where :{ id : userId}})
  //   if(!user){
  //     throw new BadRequestException(`THE USER WITH THE ID :${userId} NOT FOUND!! PLEASE MAKE SURE TO SIGN UP FIRST `)
  //   }
  //   const product = await this.productRepo.find({where : {id : productId}})
  //   if(!product){
  //     throw new BadRequestException(`THE PRODUCT NOT FOUND!!`)
  //   }
  //   if(product[0].amount < amount){
  //     throw new BadRequestException(`we do not have such an amount sorry came back later`)
  //   }
  //   const price = product[0].price * amount
  //   return price 
  // }

  async setOrder(userId : number , productId : number , createOrderDto : CreateOrderDto){
    const user = await this.userRepo.find({where :{ id : userId}})
    if(!user){
      throw new BadRequestException(`THE USER WITH THE ID :${userId} NOT FOUND!! PLEASE MAKE SURE TO SIGN UP FIRST `)
    }
    const product = await this.productRepo.find({where : {id : productId}})
    if(!product){
      throw new BadRequestException(`THE PRODUCT NOT FOUND!!`)
    }
    
    const newAmount = (product[0].amount) - (createOrderDto.amount)

    if(product[0].amount < createOrderDto.amount){
      throw new BadRequestException(`we do not have such an amount sorry came back later`)
    }
    let userpoints =  this.pointServices.getUserPointTotal(userId)
    let points = await userpoints.point || 0
    const price = product[0].price * createOrderDto.amount
    let finalPrice = price
    if(createOrderDto.usePoint){
      //the user take the offer : reduce the number of points 
      const discount = Math.min(points , price * 0.1)
      finalPrice -= discount
      this.pointServices.remove(userId)
      const newPoint = points - discount
      const newPointRecord =this.pointRepo.create({value : newPoint})
      await this.pointRepo.save(newPointRecord)

      const newOrder = this.orderRepo.create({
        amount : createOrderDto.amount,
        usePoint : true,
        totalPrice :finalPrice
      })
      
      this.productRepo.update(productId,{amount : newAmount})
      return await this.orderRepo.save(newOrder)
    }

    const newOrder = this.orderRepo.create({
        amount : createOrderDto.amount,
        usePoint : false ,
        totalPrice :finalPrice
      })
      this.productRepo.update(productId,{amount : newAmount})
      return await this.orderRepo.save(newOrder)
  }
  
  //find all the orders by a specific user 
  async findAll(nameparam : string) {
    const orders = await this.orderRepo.find({
      where :{user :{name : nameparam}}
    })
    return orders 
  }

  //for admin
  async findByStatus(statuspara : Status){
    const orders = await this.orderRepo.find({
      where :{status : statuspara}
    })
    return orders
  }

  async updateByUser(orderId: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepo.update(orderId ,updateOrderDto)
    if(!order){
      throw new NotFoundException(`ORDER with ID ${orderId} not found.`);
    }
    return order
  }

  async updateByAdmin(orderId : number , updateOrderAdminDto : UpdateOrderAdminDto){
    const order = await this.orderRepo.update(orderId ,updateOrderAdminDto)
    if(!order){
      throw new NotFoundException(`ORDER with ID ${orderId} not found.`);
    }
    return order
  }

  async remove(id: number) {
    const order = await this.orderRepo.find({where :{ id :id }})
    if(!order)
    {
      throw new NotFoundException(`THE ORDER WITH THE ID :${id} NOT FOUND!!`)
    }
    return await this.orderRepo.remove(order)
  }
}
