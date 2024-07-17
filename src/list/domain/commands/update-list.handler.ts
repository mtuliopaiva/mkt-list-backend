import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateProductCommand } from "./update-list.command";
import { BaseHttpException } from "src/core/exceptions/http-base.exceptions";
import { ProductService } from "src/product/services/product.service";
import { ReadProductDto } from "../dtos/read-product.dto";


@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  extends BaseHttpException
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(private readonly productService: ProductService) {
    super();
  }

  async execute(command: UpdateProductCommand): Promise<ReadProductDto> {

    const { uuid, updateProductDto } = command;

    const productData = await this.productService.updateProduct(uuid, updateProductDto);


    return <ReadProductDto>{
      uuid: productData.uuid,
      name: productData.name,
      createdAt: productData.createdAt,
      updatedAt: productData.updatedAt,
      deletedAt: productData.deletedAt,
    };
  }
}