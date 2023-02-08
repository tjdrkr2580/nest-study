import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [AuthModule, PrismaModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
