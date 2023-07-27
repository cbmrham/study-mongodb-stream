import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaClientMainModule } from '@study-mongodb-stream/prisma-client-main';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [PrismaClientMainModule],
})
export class UsersModule {}
