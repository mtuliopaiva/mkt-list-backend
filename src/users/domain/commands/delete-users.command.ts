import { ICommand } from '@nestjs/cqrs';
import { UpdateUsersDto } from '../dtos/update-users.dto';

export class DeleteUsersCommand implements ICommand {
  constructor(public readonly uuid: string) {}
}
