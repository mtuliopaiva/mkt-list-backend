import { ReadProductDto } from "./read-product.dto";


export class ListProductDto {
  data: ReadProductDto[];
  total: number;
}