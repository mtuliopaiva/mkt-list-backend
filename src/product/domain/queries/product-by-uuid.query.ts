import { IQuery } from '@nestjs/cqrs';

export class ProductByUuidQuery implements IQuery {
  constructor(
    public readonly uuid: string,
  ) {}
}