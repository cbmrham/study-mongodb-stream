import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client/main';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('login')
  login(@Body() body: Prisma.UserWhereUniqueInput) {
    return this.service.user(body);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.service.user({ id });
  }

  @Get()
  getUsers(@Body() body: any) {
    return this.service.users(body);
  }

  @Post()
  createUser(@Body() body: Prisma.UserCreateInput) {
    console.log(body);
    return this.service.createUser(body);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: Prisma.UserUpdateInput) {
    return this.service.updateUser({ where: { id }, data: body });
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.service.deleteUser({ id });
  }
}
