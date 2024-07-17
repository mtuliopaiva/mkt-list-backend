import { CqrsModule } from '@nestjs/cqrs';
import { Module, OnModuleInit } from '@nestjs/common';

import { PrismaModule } from 'src/core/prisma/prisma.module';
import { CreateProductHandler } from '../domain/commands/create-product.handler';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';
import { SoftDeleteProductHandler } from '../domain/commands/delete-product.handler';
import { UpdateProductHandler } from '../domain/commands/update-category.handler';
import { RestoreProductHandler } from '../domain/commands/restore-product.handler';
import { ProductListHandler } from '../domain/queries/list-category.handler';
import { ProductByUuidHandler } from '../domain/queries/product-by-uuid.handler';

export const CommandHandlers = [
  CreateProductHandler,
  UpdateProductHandler,
  RestoreProductHandler,
  SoftDeleteProductHandler
];

export const QueryHandlers = [ProductByUuidHandler, ProductListHandler ];

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, ...CommandHandlers, ...QueryHandlers],
  exports: [ProductService],
})
export class ProductModule implements OnModuleInit {
  constructor(private productService: ProductService) {}

  async onModuleInit() {}
}
