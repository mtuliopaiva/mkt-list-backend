import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ProductListQuery } from './list-category.query';
import { BaseHttpException } from 'src/core/exceptions/http-base.exceptions';
import { ProductService } from 'src/product/services/product.service';
import { ListProductDto } from '../dtos/list-product.dto';
import { ReadProductDto } from '../dtos/read-product.dto';

@QueryHandler(ProductListQuery)
export class ProductListHandler
  extends BaseHttpException
  implements IQueryHandler<ProductListQuery>
{
  constructor(private readonly productService: ProductService) {
    super();
  }

  async execute(query: ProductListQuery): Promise<ListProductDto> {
    const { page, itemsPerPage, search } = query;

    const [product, total] = await this.productService.getProductList(
      page,
      itemsPerPage,
      search,
    );

    return <ListProductDto>{
      data: product.length
        ? product.map(
            (productData) =>
              <ReadProductDto>{
                uuid: productData.uuid,
                name: productData.name,
                createdAt: productData.createdAt,
                updatedAt: productData.updatedAt,
                deletedAt: productData.deletedAt,
              },
          )
        : [],
      total: total,
    };
  }
}
