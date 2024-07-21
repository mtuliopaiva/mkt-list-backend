import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseHttpException } from 'src/core/exceptions/http-base.exceptions';
import { ReadListDto } from '../dtos/read-list.dto';
import { ListListQuery } from './list-list.query';
import { ListListDto } from '../dtos/list-list.dto';
import { ListService } from 'src/list/services/list.service';

@QueryHandler(ListListQuery)
export class ListListHandler
  extends BaseHttpException
  implements IQueryHandler<ListListQuery>
{
  constructor(private readonly listService: ListService) {
    super();
  }

  async execute(query: ListListQuery): Promise<ListListDto> {
    const { page, itemsPerPage, search } = query;

    const [list, total] = await this.listService.getListListAndSearch(
      page,
      itemsPerPage,
      search,
    );

    return <ListListDto>{
      data: list.length
        ? list.map(
            (listData) =>
              <ReadListDto>{
                uuid: listData.uuid,
                name: listData.name,
                createdAt: listData.createdAt,
                updatedAt: listData.updatedAt,
                deletedAt: listData.deletedAt,
              },
          )
        : [],
      total: total,
    };
  }
}
