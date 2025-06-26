import { Module } from '@nestjs/common';
import { ClassUserService } from './class_user.service';
import { ClassUserController } from './class_user.controller';
import { ClassService } from 'src/class/class.service';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Class } from 'src/typeorm/Class';
import { Class_User } from 'src/typeorm/Class_User';
import { JoinRequest } from 'src/typeorm/JoinRequests';

@Module({
  imports:[TypeOrmModule.forFeature([Class,Class_User,User,JoinRequest])],
  controllers: [ClassUserController],
  providers: [ClassUserService,ClassService,UserService],
})
export class ClassUserModule {}
