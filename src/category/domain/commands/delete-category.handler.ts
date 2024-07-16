import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseHttpException } from 'src/core/exceptions/http-base.exceptions';
import { ReadCategoryDto } from '../dtos/read-category.dto';
import { DeleteCategoryCommand } from './delete-category.command';
import { CategoryService } from 'src/category/services/user.service';

@CommandHandler(DeleteCategoryCommand)
export class SoftDeleteCategoryHandler
  extends BaseHttpException
  implements ICommandHandler<DeleteCategoryCommand>
{
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  async execute(command: DeleteCategoryCommand): Promise<ReadCategoryDto> {
    const { uuid } = command;

    const categoryData = await this.categoryService.softDeleteCategory(uuid);

    return<ReadCategoryDto> {
      uuid: categoryData.uuid,
      name: categoryData.name,
      createdAt: categoryData.createdAt,
      updatedAt: categoryData.updatedAt,
      deletedAt: categoryData.deletedAt,
    }
  }
}
