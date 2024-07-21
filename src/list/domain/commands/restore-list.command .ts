import { ICommand } from '@nestjs/cqrs';

export class RestoreListCommand implements ICommand {
  constructor(
    public readonly uuid: string ) {}
}
