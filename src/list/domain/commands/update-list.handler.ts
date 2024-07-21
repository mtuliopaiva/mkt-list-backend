import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateListCommand } from "./update-list.command";
import { BaseHttpException } from "src/core/exceptions/http-base.exceptions";
import { ProductService } from "src/product/services/product.service";
import { ReadListDto } from "../dtos/read-list.dto";
import { ListService } from "src/list/services/list.service";


@CommandHandler(UpdateListCommand)
export class UpdateListHandler
  extends BaseHttpException
  implements ICommandHandler<UpdateListCommand>
{
  constructor(private readonly listService: ListService) {
    super();
  }

  async execute(command: UpdateListCommand): Promise<ReadListDto> {

    const { uuid, updateListDto } = command;

    const listData = await this.listService.updateList(uuid, updateListDto);


    return <ReadListDto>{
      uuid: listData.uuid,
      name: listData.name,
      createdAt: listData.createdAt,
      updatedAt: listData.updatedAt,
      deletedAt: listData.deletedAt,
    };
  }
}