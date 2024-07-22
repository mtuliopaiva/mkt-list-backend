import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuditService } from '../service/audit.service';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(private readonly auditService: AuditService) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const user = req.user as { uuid: string };
      const userUuid = user?.uuid || 'anonymous';
      
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const action = `${req.method} ${req.originalUrl}`;
        const entityName = req.baseUrl.split('/').pop() || req.path.split('/')[1];
        const entityUuid = req.params.id ||  'N/A';
        const oldValue = null;
        const newValue = req.body;

        this.auditService.logAction({
          action,
          entityName,
          entityUuid,
          userUuid,
          oldValue,
          newValue,
        });
      }
    });

    next();
  }
}
