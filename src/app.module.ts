import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/modules/user.module';
import { CategoryModule } from './category/modules/category.module';
import { ProductModule } from './product/modules/product.module';
import { TesteController } from './teste/teste.controller';

@Module({
  imports: [UsersModule, CategoryModule, ProductModule],
  controllers: [AppController, TesteController],
  providers: [AppService],
})
export class AppModule {}
