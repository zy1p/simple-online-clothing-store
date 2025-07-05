import { User, userSchema } from '@lib/db';
import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { compare, hash } from 'bcryptjs';
import { CreateUserDto, LoginDto, UpdateUserDto } from './user.dto';
import { z } from 'zod/v4';

@Injectable()
export class UserService {
  constructor(
    @Inject(User.name) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async login({ usernameOrEmail, password }: LoginDto) {
    let user: User | null = null;

    if (z.email().safeParse(usernameOrEmail).success) {
      // Find the user by email
      user = await this.userModel.findOne({ email: usernameOrEmail });
    }

    // Find the user by username
    user = await this.userModel.findOne({ username: usernameOrEmail });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // TODO: Generate and return a JWT token here
    return user;
  }

  async createUser(data: CreateUserDto) {
    // Validate the data against the user schema
    const { password, ...rest } = userSchema.parse(data);

    // Hash the password before saving
    const hashedpassword = await hash(password, 10);

    return await this.userModel.create({ ...rest, password: hashedpassword });
  }

  async getUserById(id: string) {
    return await this.userModel.findById(id);
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const { password, ...rest } = data;

    // Hash the password if it is provided
    const hashedpassword = password ? await hash(password, 10) : undefined;

    return await this.userModel.findByIdAndUpdate(
      id,
      { ...rest, password: hashedpassword },
      { new: true },
    );
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
