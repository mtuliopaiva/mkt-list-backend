import { ICommand } from '@nestjs/cqrs';
import { UpdateListDto } from '../dtos/update-list.dto';

export class UpdateListCommand implements ICommand {
  constructor(
    public readonly uuid: string,
    public readonly updateListDto: UpdateListDto
  ) {}
}
