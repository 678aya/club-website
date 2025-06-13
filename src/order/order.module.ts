import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Order } from 'src/typeorm/Order';
import { Point } from 'src/typeorm/Point';
import { Product } from 'src/typeorm/Product';
import { PointService } from 'src/point/point.service';

@Module({
  imports:[TypeOrmModule.forFeature([User,Order,Point,Product])],
  controllers: [OrderController],
  providers: [OrderService,PointService],
})
export class OrderModule {}
