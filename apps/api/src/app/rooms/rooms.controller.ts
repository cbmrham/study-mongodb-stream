import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Prisma } from '@prisma/client/main';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly service: RoomsService) {}

  @Get()
  index() {
    return this.service.index({});
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get({ id });
  }

  @Post()
  create(@Body() body: Prisma.RoomCreateInput) {
    return this.service.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Prisma.RoomUpdateInput) {
    return this.service.update({ where: { id }, data: body });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete({ id });
  }
}
