import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/typeorm/Class';
import { Class_User } from 'src/typeorm/Class_User';
import { User } from 'src/typeorm/User';
import { JoinRequest } from 'src/typeorm/JoinRequests';

@Module({
  imports:[TypeOrmModule.forFeature([Class,User,JoinRequest])],
  controllers: [ClassController],
  providers: [ClassService,UserService],
})
export class ClassModule {}
