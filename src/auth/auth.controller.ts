import { Controller, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req){
   return this.authService.login(req.user.id)
  }

  
  @UseGuards(RefreshAuthGuard)
  @Post('/refreshjwt')
  refreshToken(@Req() req){
    return this.authService.refresh(req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/signOut')
  signOut(@Request() req : any){
    return this.authService.signOut(req.user.id)
  }
}
