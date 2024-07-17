import { ICommand } from '@nestjs/cqrs';
import { UpdateProductDto } from '../dtos/update-product.dto';

export class UpdateProductCommand implements ICommand {
  constructor(
    public readonly uuid: string,
    public readonly updateProductDto: UpdateProductDto
  ) {}
}
