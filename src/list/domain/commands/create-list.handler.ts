import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateListCommand } from './create-list.command';
import { ListService } from 'src/list/services/list.service';
import { List } from '@prisma/client';

@CommandHandler(CreateListCommand)
export class CreateListHandler implements ICommandHandler<CreateListCommand> {
  constructor(private readonly listService: ListService) {}

  async execute(command: CreateListCommand): Promise<List> {
    const { createListDto } = command;
    return this.listService.createList(createListDto);
  }
}
