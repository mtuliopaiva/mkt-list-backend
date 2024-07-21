import { IQuery } from '@nestjs/cqrs';

export class ListByUuidQuery implements IQuery {
  constructor(
    public readonly uuid: string,
  ) {}
}