import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from './create-category.command';
import { Category } from '@prisma/client';
import { CategoryService } from 'src/category/services/user.service';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
  constructor(private readonly categoryService: CategoryService) {}

  async execute(command: CreateCategoryCommand): Promise<Category> {
    const { createCategoryDto } = command;
    return this.categoryService.createCategory(createCategoryDto);
  }
}
