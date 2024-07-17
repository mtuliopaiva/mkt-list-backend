import { ICommand } from '@nestjs/cqrs';

export class DeleteListCommand implements ICommand {
  constructor(public readonly uuid: string) {}
}
