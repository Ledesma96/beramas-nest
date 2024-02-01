import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.URL_ALLOWED_1
  });
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
