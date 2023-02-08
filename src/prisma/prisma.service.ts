import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  OnModuleInit,
  INestApplication,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // constructor(private readonly config: ConfigService) {
  //   super({
  //     datasources: {
  //       db: config.get('DATABASE_URL'),
  //     },
  //   });
  // }
  async onModuleInit() {
    this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHookls(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
