import { ICommand } from '@nestjs/cqrs';

export class RestoreCategoryCommand implements ICommand {
  constructor(
    public readonly uuid: string ) {}
}
