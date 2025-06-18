import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt  from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './type/jwtpayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { IsNull, Repository } from 'typeorm';
import { CurrentUser } from './type/current-user';
@Injectable()

export class AuthService {
    constructor(private readonly userService : UserService,
                private readonly jwtService : JwtService,
                @Inject(refreshJwtConfig.KEY) private refreshTokenConfig : ConfigType<typeof refreshJwtConfig>,
                @InjectRepository(User) private readonly userRepo : Repository<User>){}
               

    async validateUser(email : string , password : string){
        const user = await this.userService.findByEmail(email)
        if(!user){
            throw new UnauthorizedException(`the user ${email} not found!!`)
        }
        const passwordValidate = await bcrypt.compare(password,user.password)
        if(!passwordValidate){
            throw new UnauthorizedException(`invalid credential`)
        }
        return {id : user.id}
    }

    async validateRefreshToken(userId : number , refreshToken : string){
        const user = await this.userRepo.findOne({ where: { id: userId } })
        if(!user || user.hashedRefreshToken === '') {
            throw new UnauthorizedException('invalid refresh token ')
        }
        const refreshTokenMatches = await argon2.verify(
            user.hashedRefreshToken ,
            refreshToken
        )

        if(!refreshTokenMatches){
            throw new UnauthorizedException('invalid refresh token ')
        }

        return {id : userId}
    }

    async validatJwtUser(userId : number){
        const user = await this.userService.findById(userId)
        if(!user){
            throw new UnauthorizedException('USER NOT FOUND')
        }
        const currentUser : CurrentUser = {id : userId , role : user[0].role}
        return currentUser
    }

    async login(userId : number){
        // const payload : AuthJwtPayload = {sub:userId}
        // const token =  this.jwtService.sign(payload)
        // const refreshToken = this.jwtService.sign(payload,this.refreshTokenConfig)
        const {accessToken , refreshToken} = await this.generateTokens(userId)
        const hashedRefresh = await argon2.hash(refreshToken)
        this.userService.update(userId,{hashedRefreshToken : hashedRefresh})
        return {
            id : userId,
            accessToken,
            refreshToken
        }
    }

    async signOut(userId : number){
       return await this.userService.update(userId,{hashedRefreshToken : ''})

    }

    async generateTokens(userId : number){
        const payload : AuthJwtPayload = {sub:userId}
        const [accessToken , refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload,this.refreshTokenConfig)
        ])
        return {
            id : userId,
            accessToken,
            refreshToken
        }
    }

    async refresh(userId : number){
        const {accessToken , refreshToken} = await this.generateTokens(userId)
        const hashedRefresh = await argon2.hash(refreshToken)
        await this.userService.update(userId,{hashedRefreshToken : hashedRefresh})
        return {
            id : userId,
            accessToken,
            refreshToken
        }
    }
}
