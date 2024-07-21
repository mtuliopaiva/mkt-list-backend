import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BaseHttpException } from "src/core/exceptions/http-base.exceptions";
import { RestoreListCommand } from "./restore-list.command ";
import { ReadListDto } from "../dtos/read-list.dto";
import { ListService } from "src/list/services/list.service";


@CommandHandler(RestoreListCommand)
export class RestoreListHandler
  extends BaseHttpException
  implements ICommandHandler<RestoreListCommand>
{
  constructor(private readonly listService: ListService) {
    super();
  }

  async execute(command: RestoreListCommand): Promise<ReadListDto> {

    const { uuid } = command;

    const listData = await this.listService.restoreList(uuid);


    return <ReadListDto>{
      uuid: listData.uuid,
      name: listData.name,
      createdAt: listData.createdAt,
      updatedAt: listData.updatedAt,
      deletedAt: listData.deletedAt,
    };
  }
}