import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CategoryByUuidQuery } from "./category-by-uuid.query";
import { BaseHttpException } from "src/core/exceptions/http-base.exceptions";
import { ReadCategoryDto } from "../dtos/read-category.dto";
import { CategoryService } from "src/category/services/user.service";

@QueryHandler(CategoryByUuidQuery)
export class CategoryByUuidHandler
  extends BaseHttpException
  implements IQueryHandler<CategoryByUuidQuery>
{
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  async execute(query: CategoryByUuidQuery): Promise<ReadCategoryDto> {
    const { uuid } = query;

    const categoryData = await this.categoryService.getCategoryByUuid(uuid);

    if (!categoryData) {
      throw new Error('Category not found');
    }

    return <ReadCategoryDto>{
      uuid: categoryData.uuid,
      name: categoryData.name,
      createdAt: categoryData.createdAt,
      updatedAt: categoryData.updatedAt,
      deletedAt: categoryData.deletedAt,
    }
  }
}
