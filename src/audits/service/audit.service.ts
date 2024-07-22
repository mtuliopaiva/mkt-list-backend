import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateAuditDto } from '../dtos/create-audit.dto';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async logAction(data: CreateAuditDto) {
    await this.prisma.audits.create({
      data: {
        action: data.action,
        entityName: data.entityName,
        oldValue: data.oldValue ? JSON.stringify(data.oldValue) : null,
        newValue: data.newValue ? JSON.stringify(data.newValue) : null,
        userUuid: data.userUuid,
      },
    });
  }
}
