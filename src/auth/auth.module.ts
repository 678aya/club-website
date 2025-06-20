import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import refreshJwtConfig from './config/refresh-jwt.config';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';
import { JoinRequest } from 'src/typeorm/JoinRequests';

@Module({
  imports :[TypeOrmModule.forFeature([User,JoinRequest]),
            JwtModule.registerAsync(jwtConfig.asProvider()),
            ConfigModule.forFeature(jwtConfig),
          ConfigModule.forFeature(refreshJwtConfig)],
  controllers: [AuthController],
  providers: [AuthService , UserService , LocalStrategy,JwtStrategy,RefreshJwtStrategy],
})
export class AuthModule {}
