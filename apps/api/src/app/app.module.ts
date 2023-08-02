import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [UsersModule, RoomsModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
