import { IsString, IsUUID, IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

class ProductQuantityDto {
  @IsUUID()
  productId: string;

  @IsInt()
  quantity: number;
}

export class CreateListDto {
  @IsString()
  name: string;

  @IsUUID()
  userUuid: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductQuantityDto)
  products: ProductQuantityDto[];
}
