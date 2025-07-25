import { ENV, Env } from '@lib/env';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const env = app.get<Env>(ENV);
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.use(cookieParser());
  app.use(compression());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  const SWAGGER_PATH = 'docs';
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API document')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PATH, app, documentFactory, {
    swaggerOptions: {
      // @see https://swagger.io/docs/open-source-tools/swagger-ui/usage/configuration/#parameters
      persistAuthorization: true,
      defaultModelsExpandDepth: 4,
    },
  });

  await app.listen(env.PORT, '0.0.0.0', async () => {
    const url = await app.getUrl();
    logger.log(`Server listening at ${url}`);
    logger.log(`Documentation at ${url}/${SWAGGER_PATH}`);
  });
}
void bootstrap();
