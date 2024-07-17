import { ICommand } from '@nestjs/cqrs';

export class RestoreProductCommand implements ICommand {
  constructor(
    public readonly uuid: string ) {}
}
