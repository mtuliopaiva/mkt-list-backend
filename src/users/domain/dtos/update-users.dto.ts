import { IsString, IsEmail, IsEnum, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '@prisma/client';

export class UpdateUsersDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securepassword' })
  @IsString()
  password: string;

  @ApiProperty({ example: UserType.user, enum: UserType })
  @IsEnum(UserType)
  userType: UserType;

  @ApiProperty({ example: 'http://example.com/profile.jpg', required: false })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  role: number;
}
