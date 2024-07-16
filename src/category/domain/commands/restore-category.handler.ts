import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BaseHttpException } from "src/core/exceptions/http-base.exceptions";
import { ReadCategoryDto } from "../dtos/read-category.dto";
import { RestoreCategoryCommand } from "./restore-category.command ";
import { CategoryService } from "src/category/services/user.service";


@CommandHandler(RestoreCategoryCommand)
export class RestoreCategoryHandler
  extends BaseHttpException
  implements ICommandHandler<RestoreCategoryCommand>
{
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  async execute(command: RestoreCategoryCommand): Promise<ReadCategoryDto> {

    const { uuid } = command;

    const userData = await this.categoryService.restoreCategory(uuid);


    return <ReadCategoryDto>{
      uuid: userData.uuid,
      name: userData.name,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      deletedAt: userData.deletedAt,
    };
  }
}