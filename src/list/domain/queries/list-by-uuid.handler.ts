import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { BaseHttpException } from "src/core/exceptions/http-base.exceptions";
import { ReadListDto } from "../dtos/read-list.dto";
import { ListService } from "src/list/services/list.service";
import { ListByUuidQuery } from "./list-by-uuid.query";

@QueryHandler(ListByUuidQuery)
export class ListByUuidHandler
  extends BaseHttpException
  implements IQueryHandler<ListByUuidQuery>
{
  constructor(private readonly listService: ListService) {
    super();
  }

  async execute(query: ListByUuidQuery): Promise<ReadListDto> {
    const { uuid } = query;

    const listData = await this.listService.getListByUuid(uuid);

    if (!listData) {
      throw new Error('Product not found');
    }

    return <ReadListDto>{
      uuid: listData.uuid,
      name: listData.name,
      createdAt: listData.createdAt,
      updatedAt: listData.updatedAt,
      deletedAt: listData.deletedAt,
    }
  }
}
