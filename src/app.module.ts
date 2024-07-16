import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/modules/user.module';
import { CategoryModule } from './category/modules/category.module';

@Module({
  imports: [UsersModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
