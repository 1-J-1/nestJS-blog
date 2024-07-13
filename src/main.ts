import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { HttpExceptionFilter } from 'filter';
import { ValidationPipe } from '@nestjs/common';
import { validationPipeConfig } from '../config';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // filter 사용 - 인스턴스 넘겨줌
  // app.useGlobalGuards(); // 얘 쓰면 전체적으로 인증이 필요하게 함 // 사용방법은 공홈에서 찾기
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig)); // validation 사용할 수 있음
  app.enableCors();
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
