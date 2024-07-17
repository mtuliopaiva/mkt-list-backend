import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseHttpException } from 'src/core/exceptions/http-base.exceptions';
import { DeleteListCommand } from './delete-list.command';

@CommandHandler(DeleteListCommand)
export class SoftDeleteListHandler
  extends BaseHttpException
  implements ICommandHandler<DeleteListCommand>
{
  constructor(private readonly listService: ListService) {
    super();
  }

  async execute(command: DeleteListCommand): Promise<ReadListDto> {
    const { uuid } = command;

    const listData = await this.listService.softDeleteProduct(uuid);

    return<ReadListDto> {
      uuid: listData.uuid,
      name: listData.name,
      createdAt: listData.createdAt,
      updatedAt: listData.updatedAt,
      deletedAt: listData.deletedAt,
  }
}
}
