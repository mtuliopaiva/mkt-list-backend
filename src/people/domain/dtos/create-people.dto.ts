import { IsString, IsEmail, IsEnum, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PeopleType } from '@prisma/client';

export class CreatePeopleDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securepassword' })
  @IsString()
  password: string;

  @ApiProperty({ example: PeopleType.user, enum: PeopleType })
  @IsEnum(PeopleType)
  peopleType: PeopleType;

  @ApiProperty({ example: 'http://example.com/profile.jpg', required: false })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  role: number;
}