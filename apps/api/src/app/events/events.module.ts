import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { MongodbModule } from '../mongodb/mongodb.module';
import { PrismaClientMainModule } from '@study-mongodb-stream/prisma-client-main';

@Module({
  imports: [MongodbModule, PrismaClientMainModule],
  providers: [EventsGateway],
})
export class EventsModule {}
