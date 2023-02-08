import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000'],
  });
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
