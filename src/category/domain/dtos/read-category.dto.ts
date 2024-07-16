import { UserType } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReadCategoryDto {
  @ApiProperty({ example: 'uuid-v4-string' })
  @IsString()
  uuid: string;

  @ApiProperty({ example: 'Vegetables' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;

  @ApiProperty({ example: null, required: false })
  deletedAt?: Date;
}
