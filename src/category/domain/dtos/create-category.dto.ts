import { IsString, IsEmail, IsEnum, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '@prisma/client';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Vegetables' })
  @IsString()
  name: string;
}
