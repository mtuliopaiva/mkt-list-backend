import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateListCommand } from './create-list.command';
import { Product } from '@prisma/client';
import { ProductService } from 'src/product/services/product.service';

@CommandHandler(CreateListCommand)
export class CreateListHandler implements ICommandHandler<CreateListCommand> {
  constructor(private readonly listService: ListService) {}

  async execute(command: CreateListCommand): Promise<Product> {
    const { createListDto } = command;
    return this.listService.createProduct(createListDto);
  }
}
