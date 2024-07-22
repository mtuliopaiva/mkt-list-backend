import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/modules/user.module';
import { CategoryModule } from './category/modules/category.module';
import { ProductModule } from './product/modules/product.module';
import { ListModule } from './list/modules/list.module';
import { AuthModule } from './auth/modules/auth.module';
import { AuditModule } from './audits/modules/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuditModule,
    UsersModule,
    CategoryModule,
    ProductModule,
    ListModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
