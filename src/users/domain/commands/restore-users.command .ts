import { ICommand } from '@nestjs/cqrs';
import { UpdateUsersDto } from '../dtos/update-users.dto';

export class RestoreUsersCommand implements ICommand {
  constructor(
    public readonly uuid: string ) {}
}
