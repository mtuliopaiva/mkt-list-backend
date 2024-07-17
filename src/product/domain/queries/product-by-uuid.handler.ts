import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import {  ProductByUuidQuery } from "./product-by-uuid.query";
import { BaseHttpException } from "src/core/exceptions/http-base.exceptions";
import { ReadProductDto } from "../dtos/read-product.dto";
import { ProductService } from "src/product/services/product.service";

@QueryHandler(ProductByUuidQuery)
export class ProductByUuidHandler
  extends BaseHttpException
  implements IQueryHandler<ProductByUuidQuery>
{
  constructor(private readonly productService: ProductService) {
    super();
  }

  async execute(query: ProductByUuidQuery): Promise<ReadProductDto> {
    const { uuid } = query;

    const productData = await this.productService.getProductByUuid(uuid);

    if (!productData) {
      throw new Error('Product not found');
    }

    return <ReadProductDto>{
      uuid: productData.uuid,
      name: productData.name,
      createdAt: productData.createdAt,
      updatedAt: productData.updatedAt,
      deletedAt: productData.deletedAt,
    }
  }
}
