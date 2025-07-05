import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV, Env } from '@lib/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const env = app.get<Env>(ENV);

  await app.listen(env.PORT);
}
void bootstrap();
