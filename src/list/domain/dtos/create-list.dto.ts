import { IsString, IsUUID, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ReadProductQuantityDto } from 'src/product/domain/dtos/read-product-quantity.dto';

export class CreateListDto {
  @ApiProperty({
    example: 'string',
    description: 'The name of the list',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'uuid',
    description: 'The UUID of the user',
  })
  @IsUUID()
  userUuid: string;

  @ApiProperty({
    type: [ReadProductQuantityDto],
    example: [
      {
        productId: 'uuid',
        quantity: 'number',
      }
    ],
    description: 'Array of products with quantities',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReadProductQuantityDto)
  products: ReadProductQuantityDto[];
}
