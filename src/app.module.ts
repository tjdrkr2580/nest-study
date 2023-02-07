import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [UsersModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
