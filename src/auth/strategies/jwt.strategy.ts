
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../type/jwtpayload";
import { Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@Inject(jwtConfig.KEY) private configjwt : ConfigType<typeof jwtConfig>,
                @Inject(AuthService) private authService : AuthService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:configjwt.secret!,
            ignoreExpiration:false
        })

    }
    validate(payload : AuthJwtPayload){
        const userId = payload.sub
        return this.authService.validatJwtUser(userId)
    }
}
  
 
