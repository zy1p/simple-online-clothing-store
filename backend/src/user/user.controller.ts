import { User } from '@lib/db';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
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
import { Response } from 'express';

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
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const ret = await this.userService.login(dto);

    res.cookie('access_token', ret.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(ret.exp * 1000),
    });

    res.status(200).json(ret);
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
