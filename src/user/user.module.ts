import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { JoinRequest } from 'src/typeorm/JoinRequests';
import { Team } from 'src/typeorm/Team';
import { Class_User } from 'src/typeorm/Class_User';


@Module({
  imports:[TypeOrmModule.forFeature([User,JoinRequest])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
