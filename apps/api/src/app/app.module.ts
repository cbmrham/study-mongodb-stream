import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, RoomsModule, EventsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
