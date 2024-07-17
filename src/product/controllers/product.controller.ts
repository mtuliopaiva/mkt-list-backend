import { Controller, Post, Body, Put, Query, ParseUUIDPipe, Patch, Delete, Get, ParseIntPipe } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiBody, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { CreateProductDto } from '../domain/dtos/create-product.dto';
import { ReadProductDto } from '../domain/dtos/read-product.dto';
import { CreateProductCommand } from '../domain/commands/create-product.command';
import { UpdateProductDto } from '../domain/dtos/update-product.dto';
import { UpdateProductCommand } from '../domain/commands/update-category.command';
import { DeleteProductCommand } from '../domain/commands/delete-product.command';
import { RestoreProductCommand } from '../domain/commands/restore-product.command ';
import { ProductByUuidQuery } from '../domain/queries/product-by-uuid.query';
import { ListProductDto } from '../domain/dtos/list-product.dto';
import { ProductListQuery } from '../domain/queries/list-category.query';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('find-by-uuid')
  @ApiOperation({summary: 'Get product By Uuid'})
  @ApiQuery({ name: 'uuid', type: String, required: true })
  async getProductByUuid(
    @Query('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<ReadProductDto> {
    return await this.queryBus.execute<ProductByUuidQuery, ReadProductDto>(
      new ProductByUuidQuery(uuid),
    );
  }

  @Get('list')
  @ApiOperation({ summary: 'Get product list and search' })
  @ApiQuery({ name: 'page', type: Number, required: true, example: 1 })
  @ApiQuery({ name: 'itemsPerPage', type: Number, required: true, example: 20 })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiResponse({ status: 200, description: 'List of categories', type: ListProductDto })
  async getCategoryList(
    @Query('page', ParseIntPipe) page: number,
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage: number,
    @Query('search') search?: string,
  ): Promise<ListProductDto> {
    return await this.queryBus.execute<ProductListQuery, ListProductDto>(
      new ProductListQuery(page, itemsPerPage, search),
    );
  }
  
  @Post('create')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'The Product has been successfully created.', type: ReadProductDto })
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.commandBus.execute(
      new CreateProductCommand(createProductDto),
    );
  }

  @Put('update')
  @ApiOperation({summary: 'Update product'})
  @ApiBody({type: UpdateProductDto})
  @ApiResponse({status: 201, description:'The product has been sucessfully updated.', type: ReadProductDto})
  @ApiQuery({ name: 'uuid', type: String, required: true })
  async putProductByUuid(
    @Query('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ReadProductDto> {
    return await this.commandBus.execute(
      new UpdateProductCommand(uuid, updateProductDto),
    );
  }

  @Patch('restore')
  @ApiOperation({ summary: 'Restore a product' })
  @ApiQuery({ name: 'uuid', type: String, required: true })
  @ApiResponse({ status: 200, description: 'The product has been successfully restored.', type: ReadProductDto })
  async restoreProduct(@Query('uuid', ParseUUIDPipe) uuid: string): Promise<ReadProductDto> {
    return await this.commandBus.execute(
      new RestoreProductCommand(uuid),
    );
  }

  @Delete('soft-delete')
  @ApiOperation({ summary: 'Soft delete a product' })
  @ApiQuery({ name: 'uuid', type: String, required: true })
  @ApiResponse({ status: 200, description: 'The product has been successfully soft deleted.', type: ReadProductDto })
  async softDeleteProduct(@Query('uuid', ParseUUIDPipe) uuid: string): Promise<ReadProductDto> {
    return await this.commandBus.execute(
      new DeleteProductCommand(uuid),
    );
  }

}
