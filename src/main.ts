import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.URL_ALLOWED_1, process.env.URL_ALLOWED_2,'http://127.0.0.1:3000']
  });
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
