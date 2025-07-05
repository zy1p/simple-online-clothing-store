import { DbModule, Sale, User } from '@lib/db';
import { EnvModule } from '@lib/env';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatchEverythingFilter } from './catch-everything/catch-everything.filter';
import { UserController } from './user/user.controller';
import { SaleController } from './sale/sale.controller';
import { UserService } from './user/user.service';
import { SaleService } from './sale/sale.service';

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
