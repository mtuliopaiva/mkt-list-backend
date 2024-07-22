import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { AuditService } from '../service/audit.service';
import { AuditMiddleware } from '../middlewares/audit.middleware';

@Module({
  providers: [AuditService, PrismaService],
})
export class AuditModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuditMiddleware)
      .forRoutes('*');
  }
}
