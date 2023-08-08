import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client/main';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() body) {
    console.log('body', body);
    return this.authService.signIn(body.uid);
  }

  @Post('singup')
  signUp(@Body() body: Prisma.UserCreateInput) {
    return this.authService.signup(body);
  }
}
