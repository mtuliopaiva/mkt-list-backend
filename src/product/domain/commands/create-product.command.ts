import { ICommand } from '@nestjs/cqrs';
import { CreateProductDto } from '../dtos/create-product.dto';

export class CreateProductCommand implements ICommand {
  constructor(
    public readonly createProductDto: CreateProductDto
  ) {}
}
