import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from './create-product.command';
import { Product } from '@prisma/client';
import { ProductService } from 'src/product/services/product.service';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(private readonly productService: ProductService) {}

  async execute(command: CreateProductCommand): Promise<Product> {
    const { createProductDto } = command;
    return this.productService.createProduct(createProductDto);
  }
}
