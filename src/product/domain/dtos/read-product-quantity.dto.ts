import { IsUUID, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReadProductQuantityDto {
  @ApiProperty({
    example: 'uuid',
    description: 'The UUID of the product',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    example: 'number',
    description: 'The quantity of the product',
  })
  @IsInt()
  quantity: number;
}
