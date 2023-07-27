import { INestApplication } from '@nestjs/common';
import { PrismaService } from './lib/prisma.service';

export * from './lib/prisma-client-main.module';
export * from './lib/prisma.service';
export { User, Post, Prisma } from '@prisma/client/main';

export async function registerPrismaShutdown(app: INestApplication) {
  // recommended by NestJS
  // https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}
