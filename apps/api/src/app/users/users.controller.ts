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
    return this.service.get(body);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get({ id });
  }

  @Get()
  index(@Body() body: any) {
    return this.service.index(body);
  }

  @Post()
  create(@Body() body: Prisma.UserCreateInput) {
    console.log(body);
    return this.service.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Prisma.UserUpdateInput) {
    return this.service.update({ where: { id }, data: body });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete({ id });
  }
}
