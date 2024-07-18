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
import { PeopleListQuery } from '../domain/queries/list-people.query';
import { ListPeopleDto } from '../domain/dtos/list-people.dto';
import { People } from '@prisma/client';
import { PeopleByUuidQuery } from '../domain/queries/people-by-uuid.query';
import { ReadPeopleDto } from '../domain/dtos/read-people.dto';
import { CreatePeopleDto } from '../domain/dtos/create-people.dto';
import { UpdatePeopleDto } from '../domain/dtos/update-people.dto';
import { UpdatePeopleCommand } from '../domain/commands/update-people.command';
import { CreatePeopleCommand } from '../domain/commands/create-people.command';
import { DeletePeopleCommand } from '../domain/commands/delete-people.command';
import { RestorePeopleCommand } from '../domain/commands/restore-people.command ';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('find-by-uuid')
  @ApiOperation({summary: 'Get People By Uuid'})
  @ApiQuery({ name: 'uuid', type: String, required: true })
  async getPeopleByUuid(
    @Query('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<ReadPeopleDto> {
    return await this.queryBus.execute<PeopleByUuidQuery, ReadPeopleDto>(
      new PeopleByUuidQuery(uuid),
    );
  }

  @Get('list')
  @ApiOperation({ summary: 'Get people list and search' })
  @ApiQuery({ name: 'page', type: Number, required: true, example: 1 })
  @ApiQuery({ name: 'itemsPerPage', type: Number, required: true, example: 20 })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiResponse({ status: 200, description: 'List of people', type: ListPeopleDto })
  async getPeopleList(
    @Query('page', ParseIntPipe) page: number,
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage: number,
    @Query('search') search?: string,
  ): Promise<ListPeopleDto> {
    return await this.queryBus.execute<PeopleListQuery, ListPeopleDto>(
      new PeopleListQuery(page, itemsPerPage, search),
    );
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new people' })
  @ApiBody({ type: CreatePeopleDto })
  @ApiResponse({ status: 201, description: 'The people has been successfully created.', type: ReadPeopleDto })
  async createPeople(@Body() createPeopleDto: CreatePeopleDto): Promise<People> {
    return await this.commandBus.execute(
      new CreatePeopleCommand(createPeopleDto),
    );
  }

  @Put('update')
  @ApiOperation({summary: 'Update People'})
  @ApiBody({type: UpdatePeopleDto})
  @ApiResponse({status: 201, description:'The people has been sucessfully updated.', type: ReadPeopleDto})
  @ApiQuery({ name: 'uuid', type: String, required: true })
  async putPeopleByUuid(
    @Query('uuid', ParseUUIDPipe) uuid: string,
    @Body() updatePeopleDto: UpdatePeopleDto,
  ): Promise<ReadPeopleDto> {
    return await this.commandBus.execute(
      new UpdatePeopleCommand(uuid, updatePeopleDto),
    );
  }

  @Patch('restore')
  @ApiOperation({ summary: 'Restore an people' })
  @ApiQuery({ name: 'uuid', type: String, required: true })
  @ApiResponse({ status: 200, description: 'The people has been successfully restored.', type: ReadPeopleDto })
  async restorePeople(@Query('uuid', ParseUUIDPipe) uuid: string): Promise<ReadPeopleDto> {
    return await this.commandBus.execute(
      new RestorePeopleCommand(uuid),
    );
  }

  @Delete('soft-delete')
  @ApiOperation({ summary: 'Soft delete an people' })
  @ApiQuery({ name: 'uuid', type: String, required: true })
  @ApiResponse({ status: 200, description: 'The people has been successfully soft deleted.', type: ReadPeopleDto })
  async softDeletePeople(@Query('uuid', ParseUUIDPipe) uuid: string): Promise<ReadPeopleDto> {
    return await this.commandBus.execute(
      new DeletePeopleCommand(uuid),
    );
  }
}