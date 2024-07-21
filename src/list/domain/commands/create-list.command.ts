// create-list.command.ts
import { ICommand } from '@nestjs/cqrs';
import { CreateListDto } from '../dtos/create-list.dto';

export class CreateListCommand implements ICommand {
  constructor(public readonly createListDto: CreateListDto) {}
}