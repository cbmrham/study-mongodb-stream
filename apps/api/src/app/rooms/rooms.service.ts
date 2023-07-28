import { Injectable } from '@nestjs/common';
import {
  Prisma,
  PrismaService,
  Room,
} from '@study-mongodb-stream/prisma-client-main';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async get(roomWhereUniqueInput: Prisma.RoomWhereUniqueInput) {
    return this.prisma.room.findUnique({
      where: roomWhereUniqueInput,
    });
  }

  async index(options: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Room[]> {
    const { skip, take, cursor, where, orderBy } = options;

    return this.prisma.room.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.RoomCreateInput) {
    return this.prisma.room.create({
      data,
    });
  }

  async update(options: {
    where: Prisma.RoomWhereUniqueInput;
    data: Prisma.RoomUpdateInput;
  }) {
    const { where, data } = options;
    return this.prisma.room.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.RoomWhereUniqueInput) {
    return this.prisma.room.delete({
      where,
    });
  }
}
