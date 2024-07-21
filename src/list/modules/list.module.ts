import { CqrsModule } from '@nestjs/cqrs';
import { Module, OnModuleInit } from '@nestjs/common';

import { PrismaModule } from 'src/core/prisma/prisma.module';
import { CreateListHandler } from '../domain/commands/create-list.handler';
import { ListController } from '../controllers/list.controller';
import { ListService } from '../services/list.service';
import { ListListHandler } from '../domain/queries/list-list.handler';
import { ListByUuidHandler } from '../domain/queries/list-by-uuid.handler';
import { UpdateListHandler } from '../domain/commands/update-list.handler';
import { RestoreListHandler } from '../domain/commands/restore-list.handler';
import { SoftDeleteListHandler } from '../domain/commands/delete-list.handler';

export const CommandHandlers = [
  CreateListHandler,
  UpdateListHandler,
  RestoreListHandler,
  SoftDeleteListHandler
];

export const QueryHandlers = [ListByUuidHandler, ListListHandler ];

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [ListController],
  providers: [ListService, ...CommandHandlers, ...QueryHandlers],
  exports: [ListService],
})
export class ListModule implements OnModuleInit {
  constructor(private listService: ListService) {}

  async onModuleInit() {}
}
