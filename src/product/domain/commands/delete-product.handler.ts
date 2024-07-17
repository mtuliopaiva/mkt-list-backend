import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseHttpException } from 'src/core/exceptions/http-base.exceptions';
import { DeleteProductCommand } from './delete-product.command';
import { ReadProductDto } from '../dtos/read-product.dto';
import { ProductService } from 'src/product/services/product.service';

@CommandHandler(DeleteProductCommand)
export class SoftDeleteProductHandler
  extends BaseHttpException
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(private readonly productService: ProductService) {
    super();
  }

  async execute(command: DeleteProductCommand): Promise<ReadProductDto> {
    const { uuid } = command;

    const productData = await this.productService.softDeleteProduct(uuid);

    return<ReadProductDto> {
      uuid: productData.uuid,
      name: productData.name,
      createdAt: productData.createdAt,
      updatedAt: productData.updatedAt,
      deletedAt: productData.deletedAt,
  }
}
}
