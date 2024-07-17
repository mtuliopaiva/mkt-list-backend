import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Vegetables' })
  @IsString()
  name: string;

  @ApiProperty({ example: 10.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'c1b8f8c2-9f8d-4b9b-8e9d-4c9b8f8d9e9d' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  deletedAt?: Date;
}
