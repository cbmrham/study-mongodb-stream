import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { PrismaClientMainModule } from '@study-mongodb-stream/prisma-client-main';
import { RoomsController } from './rooms.controller';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
  imports: [PrismaClientMainModule],
})
export class RoomsModule {}
