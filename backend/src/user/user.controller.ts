import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post('signup')
  signup() {
    // Handle user signup
  }

  @Post('login')
  login() {
    // Handle user login
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    // Handle get user by ID
  }

  @Put(':id')
  updateUser(@Param('id') id: string) {
    // Handle update user by ID
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    // Handle delete user by ID
  }
}
