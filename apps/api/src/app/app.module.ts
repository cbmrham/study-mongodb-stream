import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataAccessUsersModule } from '@study-mongodb-stream/data-access-users';
import { EventsModule } from './events/events.module';

@Module({
  imports: [DataAccessUsersModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
