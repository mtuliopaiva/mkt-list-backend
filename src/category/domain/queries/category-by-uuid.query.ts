import { IQuery } from '@nestjs/cqrs';

export class CategoryByUuidQuery implements IQuery {
  constructor(
    public readonly uuid: string,
  ) {}
}