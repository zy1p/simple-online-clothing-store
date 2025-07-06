import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import {
  CreateUserDto,
  LoginDto,
  LoginResponseDto,
  UpdateUserDto,
} from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth';

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
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
