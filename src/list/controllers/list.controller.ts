import { Controller, Post, Body, Put, Query, ParseUUIDPipe, Patch, Delete, Get, ParseIntPipe } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiBody, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ReadListDto } from '../domain/dtos/read-list.dto';
import { ListByUuidQuery } from '../domain/queries/list-by-uuid.query';
import { ListListDto } from '../domain/dtos/list-list.dto';
import { ListListQuery } from '../domain/queries/list-list.query';
import { CreateListDto } from '../domain/dtos/create-list.dto';
import { CreateListCommand } from '../domain/commands/create-list.command';
import { UpdateListDto } from '../domain/dtos/update-list.dto';
import { List } from '@prisma/client';
import { UpdateListCommand } from '../domain/commands/update-list.command';
import { DeleteListCommand } from '../domain/commands/delete-list.command';
import { RestoreListCommand } from '../domain/commands/restore-list.command ';

@ApiTags('List')
@Controller('list')
export class ListController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('find-by-uuid')
  @ApiOperation({summary: 'Get list By Uuid'})
  @ApiQuery({ name: 'uuid', type: String, required: true })
  async getListByUuid(
    @Query('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<ReadListDto> {
    return await this.queryBus.execute<ListByUuidQuery, ReadListDto>(
      new ListByUuidQuery(uuid),
    );
  }

  @Get('list')
  @ApiOperation({ summary: 'Get list list and search' })
  @ApiQuery({ name: 'page', type: Number, required: true, example: 1 })
  @ApiQuery({ name: 'itemsPerPage', type: Number, required: true, example: 20 })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiResponse({ status: 200, description: 'List of lists', type: ListListDto })
  async getListAndListAndSearch(
    @Query('page', ParseIntPipe) page: number,
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage: number,
    @Query('search') search?: string,
  ): Promise<ListListDto> {
    return await this.queryBus.execute<ListListQuery, ListListDto>(
      new ListListQuery(page, itemsPerPage, search),
    );
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new list' })
  @ApiBody({ type: CreateListDto })
  @ApiResponse({ status: 201, description: 'The List has been successfully created.', type: ReadListDto })
  async createList(@Body() createListDto: CreateListDto): Promise<List> {
    return await this.commandBus.execute(
      new CreateListCommand(createListDto),
    );
  }

  @Put('update')
  @ApiOperation({summary: 'Update list'})
  @ApiBody({type: UpdateListDto})
  @ApiResponse({status: 201, description:'The list has been sucessfully updated.', type: ReadListDto})
  @ApiQuery({ name: 'uuid', type: String, required: true })
  async putListByUuid(
    @Query('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateListDto: UpdateListDto,
  ): Promise<ReadListDto> {
    return await this.commandBus.execute(
      new UpdateListCommand(uuid, updateListDto),
    );
  }

  @Patch('restore')
  @ApiOperation({ summary: 'Restore a list' })
  @ApiQuery({ name: 'uuid', type: String, required: true })
  @ApiResponse({ status: 200, description: 'The list has been successfully restored.', type: ReadListDto })
  async restoreList(@Query('uuid', ParseUUIDPipe) uuid: string): Promise<ReadListDto> {
    return await this.commandBus.execute(
      new RestoreListCommand(uuid),
    );
  }

  @Delete('soft-delete')
  @ApiOperation({ summary: 'Soft delete a list' })
  @ApiQuery({ name: 'uuid', type: String, required: true })
  @ApiResponse({ status: 200, description: 'The list has been successfully soft deleted.', type: ReadListDto })
  async softDeleteList(@Query('uuid', ParseUUIDPipe) uuid: string): Promise<ReadListDto> {
    return await this.commandBus.execute(
      new DeleteListCommand(uuid),
    );
  }
}
