import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV, Env } from '@lib/env';
import { Logger } from 'nestjs-pino';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const env = app.get<Env>(ENV);
  const logger = app.get(Logger);
  app.useLogger(logger);

  await app.listen(env.PORT, '0.0.0.0', async () => {
    const url = await app.getUrl();
    logger.log(`Server listening at ${url}`);
  });
}
void bootstrap();
