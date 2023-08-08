import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Headers,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client/main';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() body) {
    return this.authService.signIn(body.uid);
  }

  @Post('signup')
  signUp(@Body() body: Prisma.UserCreateInput) {
    return this.authService.signup(body);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Headers('authorization') authorization: string) {
    return this.authService.me(extractToken(authorization));
  }
}

function extractToken(authorization: string): string | undefined {
  const [type, token] = authorization.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}
