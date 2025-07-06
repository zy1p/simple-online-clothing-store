import { User } from '@lib/db';
import { Env, ENV } from '@lib/env';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(ENV) private readonly env: Env,
    @Inject(User.name) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    let userId: string | null = null;

    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        exp: number;
        iat: number;
      }>(token, {
        secret: this.env.JWT_SECRET,
      });

      userId = payload.sub;
    } catch {
      throw new UnauthorizedException();
    }

    // Attatch user to request object
    const user = await this.userModel.findById(userId);
    if (!user) throw new UnauthorizedException();
    request['user'] = user;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
