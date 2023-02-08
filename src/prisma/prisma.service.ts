import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly config: ConfigService) {
    super({
      datasources: {
        db: config.get('DATABASE_URL'),
      },
    });
  }
}
