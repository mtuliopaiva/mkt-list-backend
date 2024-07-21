import { ApiProperty } from '@nestjs/swagger';

export class ReadListDto {
  @ApiProperty({ example: 'c1b8f8c2-9f8d-4b9b-8e9d-4c9b8f8d9e9d' })
  uuid: string;

  @ApiProperty({ example: 'Vegetables' })
  name: string;

  @ApiProperty({ example: 'c1b8f8c2-9f8d-4b9b-8e9d-4c9b8f8d9e9d' })
  userId: string;

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: Date;

  @ApiProperty({ example: new Date().toISOString() })
  updatedAt: Date;

  @ApiProperty({ example: null, required: false })
  deletedAt?: Date;
}
