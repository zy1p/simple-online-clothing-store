import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty() username: string;
  @ApiProperty() password: string;
  @ApiProperty() email: string;
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
  @ApiProperty() usernameOrEmail: string;
  @ApiProperty() password: string;
}
