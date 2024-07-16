import { IsString, IsEmail, IsEnum, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

}
