import { IQuery } from '@nestjs/cqrs';

export class ListListQuery implements IQuery {
  constructor(
    public readonly page: number,
    public readonly itemsPerPage: number,
    public readonly search?: string,
  ) {}
}