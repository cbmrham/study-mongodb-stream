import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Prisma,
  PrismaService,
  User,
} from '@study-mongodb-stream/prisma-client-main';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async get(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user
      .findUnique({
        where: userWhereUniqueInput,
      })
      .then((user) => {
        if (!user) {
          throw new NotFoundException();
        } else {
          return user;
        }
      });
  }

  async index(options: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = options;

    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  async update(options: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    const { where, data } = options;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
    });
  }
}
