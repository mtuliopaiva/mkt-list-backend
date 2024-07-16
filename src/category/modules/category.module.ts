import { CqrsModule } from '@nestjs/cqrs';
import { Module, OnModuleInit } from '@nestjs/common';

import { PrismaModule } from 'src/core/prisma/prisma.module';
import { CreateCategoryHandler } from '../domain/commands/create-category.handler';
import { UpdateCategoryHandler } from '../domain/commands/update-category.handler';
import { RestoreCategoryHandler } from '../domain/commands/restore-category.handler';
import { SoftDeleteCategoryHandler } from '../domain/commands/delete-category.handler';
import { CategoryListHandler } from '../domain/queries/list-category.handler';
import { CategoryByUuidHandler } from '../domain/queries/category-by-uuid.handler';
import { CategoryService } from '../services/user.service';
import { CategoryController } from '../controllers/category.controller';

export const CommandHandlers = [
  CreateCategoryHandler,
  UpdateCategoryHandler,
  RestoreCategoryHandler,
  SoftDeleteCategoryHandler,
];

export const QueryHandlers = [CategoryListHandler, CategoryByUuidHandler];

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService, ...CommandHandlers, ...QueryHandlers],
  exports: [CategoryService],
})
export class CategoryModule implements OnModuleInit {
  constructor(private categoryService: CategoryService) {}

  async onModuleInit() {}
}
