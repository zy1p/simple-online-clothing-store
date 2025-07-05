import { EnvModule } from '@lib/env';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule, Sale, User } from '@lib/db';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
