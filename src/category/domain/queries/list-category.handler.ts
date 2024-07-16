import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { CategoryListQuery } from './list-category.query';
import { ListCategoryDto } from '../dtos/list-category.dto';
import { BaseHttpException } from 'src/core/exceptions/http-base.exceptions';
import { ReadCategoryDto } from '../dtos/read-category.dto';
import { CategoryService } from 'src/category/services/user.service';

@QueryHandler(CategoryListQuery)
export class CategoryListHandler
  extends BaseHttpException
  implements IQueryHandler<CategoryListQuery>
{
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  async execute(query: CategoryListQuery): Promise<ListCategoryDto> {
    const { page, itemsPerPage, search } = query;

    const [category, total] = await this.categoryService.getCategoryList(
      page,
      itemsPerPage,
      search,
    );

    return <ListCategoryDto>{
      data: category.length
        ? category.map(
            (categoryData) =>
              <ReadCategoryDto>{
                uuid: categoryData.uuid,
                name: categoryData.name,
                createdAt: categoryData.createdAt,
                updatedAt: categoryData.updatedAt,
                deletedAt: categoryData.deletedAt,
              },
          )
        : [],
      total: total,
    };
  }
}
