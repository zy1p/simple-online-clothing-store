import { DbModule, Sale, User } from '@lib/db';
import { Env, ENV, EnvModule } from '@lib/env';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatchEverythingFilter } from './catch-everything';
import { SaleController, SaleService } from './sale';
import { UserController, UserService } from './user';

@Module({
  imports: [
    EnvModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        // install 'pino-pretty' package in order to use the following option
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    DbModule.forRoot(),
    DbModule.forFeature(User, Sale),
    JwtModule.registerAsync({
      inject: [ENV],
      useFactory: (env: Env) => ({
        secret: env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AppController, UserController, SaleController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
    UserService,
    SaleService,
  ],
})
export class AppModule {}
