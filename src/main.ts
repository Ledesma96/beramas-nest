import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://127.0.0.1:3000'
  });
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
