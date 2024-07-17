import { ICommand } from '@nestjs/cqrs';
import { CreateProductDto } from '../dtos/create-product.dto';

export class CreateListCommand implements ICommand {
  constructor(
    public readonly createListDto: CreateListDto
  ) {}
}
