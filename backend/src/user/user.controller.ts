import { User } from '@lib/db';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth';
import { CurrentUser } from './user.decorator';
import {
  CreateUserDto,
  LoginDto,
  LoginResponseDto,
  UpdateUserDto,
} from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.userService.login(dto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('me')
  getCurrentUser(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  getUserById(@Param('id') id: string, @CurrentUser() user: User) {
    // TODO: Replace with a more robust authorization check
    if (user.username !== 'zy1p' && user.id !== id)
      throw new UnauthorizedException();

    return this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser() user: User,
  ) {
    // TODO: Replace with a more robust authorization check
    if (user.username !== 'zy1p' && user.id !== id)
      throw new UnauthorizedException();

    return this.userService.updateUser(id, dto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  deleteUser(@Param('id') id: string, @CurrentUser() user: User) {
    // TODO: Replace with a more robust authorization check
    if (user.username !== 'zy1p' && user.id !== id)
      throw new UnauthorizedException();

    return this.userService.deleteUser(id);
  }
}
