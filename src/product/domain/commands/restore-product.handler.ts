import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BaseHttpException } from "src/core/exceptions/http-base.exceptions";
import { RestoreProductCommand } from "./restore-product.command ";
import { CategoryService } from "src/category/services/user.service";
import { ProductService } from "src/product/services/product.service";
import { ReadProductDto } from "../dtos/read-product.dto";


@CommandHandler(RestoreProductCommand)
export class RestoreProductHandler
  extends BaseHttpException
  implements ICommandHandler<RestoreProductCommand>
{
  constructor(private readonly productService: ProductService) {
    super();
  }

  async execute(command: RestoreProductCommand): Promise<ReadProductDto> {

    const { uuid } = command;

    const productData = await this.productService.restoreProduct(uuid);


    return <ReadProductDto>{
      uuid: productData.uuid,
      name: productData.name,
      createdAt: productData.createdAt,
      updatedAt: productData.updatedAt,
      deletedAt: productData.deletedAt,
    };
  }
}