import {
  Controller,
  Get,
  Post,
  Query,
  ParseIntPipe,
  Body,
  ParseUUIDPipe,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiQuery, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryListQuery } from '../domain/queries/list-category.query';
import { ListCategoryDto } from '../domain/dtos/list-category.dto';
import { Category } from '@prisma/client';
import { CategoryByUuidQuery } from '../domain/queries/category-by-uuid.query';
import { ReadCategoryDto } from '../domain/dtos/read-category.dto';
import { CreateCategoryDto } from '../domain/dtos/create-category.dto';
import { UpdateCategoryDto } from '../domain/dtos/update-category.dto';
import { UpdateCategoryCommand } from '../domain/commands/update-category.command';
import { CreateCategoryCommand } from '../domain/commands/create-category.command';
import { DeleteCategoryCommand } from '../domain/commands/delete-category.command';
import { RestoreCategoryCommand } from '../domain/commands/restore-category.command ';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('find-by-uuid')
  @ApiOperation({summary: 'Get Category By Uuid'})
  @ApiQuery({ name: 'uuid', type: String, required: true })
  async getCaegoryByUuid(
    @Query('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<ReadCategoryDto> {
    return await this.queryBus.execute<CategoryByUuidQuery, ReadCategoryDto>(
      new CategoryByUuidQuery(uuid),
    );
  }

  @Get('list')
  @ApiOperation({ summary: 'Get category list and search' })
  @ApiQuery({ name: 'page', type: Number, required: true, example: 1 })
  @ApiQuery({ name: 'itemsPerPage', type: Number, required: true, example: 20 })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiResponse({ status: 200, description: 'List of categories', type: ListCategoryDto })
  async getCategoryList(
    @Query('page', ParseIntPipe) page: number,
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage: number,
    @Query('search') search?: string,
  ): Promise<ListCategoryDto> {
    return await this.queryBus.execute<CategoryListQuery, ListCategoryDto>(
      new CategoryListQuery(page, itemsPerPage, search),
    );
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'The category has been successfully created.', type: ReadCategoryDto })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.commandBus.execute(
      new CreateCategoryCommand(createCategoryDto),
    );
  }

  @Put('update')
  @ApiOperation({summary: 'Update category'})
  @ApiBody({type: UpdateCategoryDto})
  @ApiResponse({status: 201, description:'The category has been sucessfully updated.', type: ReadCategoryDto})
  @ApiQuery({ name: 'uuid', type: String, required: true })
  async putCategoryByUuid(
    @Query('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<ReadCategoryDto> {
    return await this.commandBus.execute(
      new UpdateCategoryCommand(uuid, updateCategoryDto),
    );
  }

  @Patch('restore')
  @ApiOperation({ summary: 'Restore a category' })
  @ApiQuery({ name: 'uuid', type: String, required: true })
  @ApiResponse({ status: 200, description: 'The category has been successfully restored.', type: ReadCategoryDto })
  async restoreCategory(@Query('uuid', ParseUUIDPipe) uuid: string): Promise<ReadCategoryDto> {
    return await this.commandBus.execute(
      new RestoreCategoryCommand(uuid),
    );
  }

  @Delete('soft-delete')
  @ApiOperation({ summary: 'Soft delete a category' })
  @ApiQuery({ name: 'uuid', type: String, required: true })
  @ApiResponse({ status: 200, description: 'The category has been successfully soft deleted.', type: ReadCategoryDto })
  async softDeleteCategory(@Query('uuid', ParseUUIDPipe) uuid: string): Promise<ReadCategoryDto> {
    return await this.commandBus.execute(
      new DeleteCategoryCommand(uuid),
    );
  }
}
