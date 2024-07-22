import { IsString, IsOptional } from 'class-validator';

export class CreateAuditDto {
  @IsString()
  action: string;

  @IsString()
  entityName: string;

  @IsString()
  entityUuid: string;

  @IsString()
  @IsOptional()
  oldValue?: string;

  @IsString()
  @IsOptional()
  newValue?: string;

  @IsString()
  @IsOptional()
  userUuid?: string;
}
