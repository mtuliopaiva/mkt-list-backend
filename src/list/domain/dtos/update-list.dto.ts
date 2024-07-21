import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateListDto {

  @ApiProperty({ example: 'Vegetables' })
  @IsOptional()
  @IsString()
  name: string;


  @ApiProperty({ example: 'c1b8f8c2-9f8d-4b9b-8e9d-4c9b8f8d9e9d' })
  @IsOptional()
  @IsUUID()
  userId: string;


  @ApiProperty({ required: false })
  @IsOptional()
  createdAt?: Date;


  @ApiProperty({ required: false })
  @IsOptional()
  updatedAt?: Date;


  @ApiProperty({ required: false })
  @IsOptional()
  deletedAt?: Date;
}
