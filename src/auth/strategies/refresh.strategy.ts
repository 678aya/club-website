import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthJwtPayload } from "../type/jwtpayload";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import refreshJwtConfig from "../config/refresh-jwt.config";
import { Request } from "express";
import { AuthService } from "../auth.service";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy,'refresh-jwt'){
    constructor(@Inject(refreshJwtConfig.KEY) private configRefreshjwt : ConfigType<typeof refreshJwtConfig>,
                @Inject(AuthService) private authService : AuthService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:configRefreshjwt.secret!,
            ignoreExpiration:false,
            passReqToCallback:true
        })

    }
    validate(req : Request ,payload : AuthJwtPayload){
        // const authHeader = req.get('authorization');
        // const refreshToken = authHeader && authHeader.startsWith('Bearer ') 
        // ? authHeader.replace('Bearer ', '').trim() 
        // : '';

        // const refreshToken = req.get('authorization')!.replace('Bearer','').trim()
    //     const authHeader = req.get('authorization');
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //        throw new UnauthorizedException('Refresh token is missing');
    //     }
    // const refreshToken = authHeader.replace('Bearer ', '').trim();
    const authHeader = req.get('authorization');
if (!authHeader || !authHeader.startsWith('Bearer ')) {
  throw new UnauthorizedException('Missing or malformed token');
}
const refreshToken = authHeader.split(' ')[1];
        const userId = payload.sub
        return this.authService.validateRefreshToken(userId,refreshToken)
    }
}
  
 
