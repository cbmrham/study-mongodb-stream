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

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.service.user({ id });
  }

  @Get()
  getUsers(@Body() body: any) {
    return this.service.users(body);
  }

  @Post()
  createUser(@Body() body: any) {
    return this.service.createUser(body);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.service.updateUser({ where: { id }, data: body });
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.service.deleteUser({ id });
  }
}
