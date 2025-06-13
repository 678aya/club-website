import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from 'src/typeorm/Point';
import { User } from 'src/typeorm/User';

@Module({
  imports:[TypeOrmModule.forFeature([User,Point])],
  controllers: [PointController],
  providers: [PointService],
})
export class PointModule {}
