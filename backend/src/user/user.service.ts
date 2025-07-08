import { User, userSchema } from '@lib/db';
import { Env, ENV } from '@lib/env';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import { compare, hash } from 'bcryptjs';
import { z } from 'zod/v4';
import { CreateUserDto, LoginDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(User.name) private readonly userModel: ReturnModelType<typeof User>,
    @Inject(ENV) private readonly env: Env,
    private readonly jwtService: JwtService,
  ) {}

  async login({ usernameOrEmail, password }: LoginDto) {
    let user: User | null = null;

    if (z.email().safeParse(usernameOrEmail).success) {
      // Find the user by email
      user = await this.userModel
        .findOne({ email: usernameOrEmail })
        .select('+password');
    }

    // Find the user by username
    user = await this.userModel
      .findOne({ username: usernameOrEmail })
      .select('+password');

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await compare(password, user.password!);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const payload = { sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    const decoded = await this.jwtService.verifyAsync<{
      sub: string;
      exp: number;
      iat: number;
    }>(access_token);

    return { access_token, ...decoded };
  }

  async createUser(data: CreateUserDto) {
    // Validate the data against the user schema
    const { password, ...rest } = userSchema.parse(data);

    // Hash the password before saving
    const hashedpassword = await hash(password, 10);

    await this.userModel.create({
      ...rest,
      password: hashedpassword,
    });

    return true;
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException();

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    // Validate the data against the user schema
    const { password, ...rest } = userSchema.partial().parse(data);

    // Hash the password if it is provided
    const hashedpassword = password ? await hash(password, 10) : undefined;

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { ...rest, password: hashedpassword },
      { new: true },
    );

    return updatedUser;
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
