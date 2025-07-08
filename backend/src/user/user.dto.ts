import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'zy1p' }) username: string;
  @ApiProperty({ example: 'Password123!' }) password: string;
  @ApiProperty({ example: 'user@example.com' }) email: string;
  @ApiProperty() firstName?: string;
  @ApiProperty() lastName?: string;
  @ApiProperty() phoneNumber?: string;
  @ApiProperty() address?: string;
}

export class UpdateUserDto {
  @ApiProperty() username?: string;
  @ApiProperty() password?: string;
  @ApiProperty() email?: string;
  @ApiProperty() firstName?: string;
  @ApiProperty() lastName?: string;
  @ApiProperty() phoneNumber?: string;
  @ApiProperty() address?: string;
}

export class LoginDto {
  @ApiProperty({ example: 'zy1p' }) usernameOrEmail: string;
  @ApiProperty({ example: 'Password123!' }) password: string;
}

export class LoginResponseDto {
  @ApiProperty() access_token: string;
  @ApiProperty() sub: string;
  @ApiProperty() exp: number;
  @ApiProperty() iat: number;
}
