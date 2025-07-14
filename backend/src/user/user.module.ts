import { DbModule, User } from '@lib/db';
import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Global()
@Module({
  imports: [DbModule.forFeature(User)],
  controllers: [UserController],
  providers: [UserService],
  exports: [DbModule.forFeature(User)],
})
export class UserModule {}
