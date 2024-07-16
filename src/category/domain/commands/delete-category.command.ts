import { ICommand } from '@nestjs/cqrs';

export class DeleteCategoryCommand implements ICommand {
  constructor(public readonly uuid: string) {}
}
