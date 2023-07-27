import { Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Db> => {
        const uri = process.env.DATABASE_MAIN_URL;
        const client = await MongoClient.connect(uri);
        return client.db();
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class MongodbModule {}

// https://gusiol.medium.com/nestjs-with-mongodb-native-driver-9d82e377d55
// https://www.mongodb.com/developer/languages/javascript/nodejs-change-streams-triggers/
