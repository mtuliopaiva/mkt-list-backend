import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @IsOptional()
  @ApiProperty({ example: 'Vegetables' })
  @IsString()
  name?: string;

  @IsOptional()
  @ApiProperty({ example: 10.99 })
  @IsNumber()
  price?: number;

  @IsOptional()
  @ApiProperty({ example: 'c1b8f8c2-9f8d-4b9b-8e9d-4c9b8f8d9e9d' })
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsOptional()
  deletedAt?: Date;
}
