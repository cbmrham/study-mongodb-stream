import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client/main';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(uid: string) {
    const user = await this.usersService.get({ uid });
    const payload = { sub: user.id, uid: user.uid };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(data: Prisma.UserCreateInput) {
    await this.usersService.create(data);
    return this.signIn(data.uid);
  }
}
