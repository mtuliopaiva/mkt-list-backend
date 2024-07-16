import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateCategoryCommand } from "./update-category.command";
import { BaseHttpException } from "src/core/exceptions/http-base.exceptions";
import { UsersService } from "src/users/services/user.service";
import { ReadCategoryDto } from "../dtos/read-category.dto";
import { UserType } from "src/users/enums/userType.enum";
import { CategoryService } from "src/category/services/user.service";


@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler
  extends BaseHttpException
  implements ICommandHandler<UpdateCategoryCommand>
{
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  async execute(command: UpdateCategoryCommand): Promise<ReadCategoryDto> {

    const { uuid, updateCategoryDto } = command;

    const categoryData = await this.categoryService.putCategory(uuid, updateCategoryDto);


    return <ReadCategoryDto>{
      uuid: categoryData.uuid,
      name: categoryData.name,
      createdAt: categoryData.createdAt,
      updatedAt: categoryData.updatedAt,
      deletedAt: categoryData.deletedAt,
    };
  }
}