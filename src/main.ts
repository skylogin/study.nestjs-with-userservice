import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as dotenv from 'dotenv';
// import * as path from 'path';
import { Logger3Middleware } from './logger/logger3.middleware';

// dotenv.config({
//   path: path.resolve(
//     process.env.NODE_ENV === 'production'
//       ? '.production.env'
//       : process.env.NODE_ENV === 'stage'
//       ? '.stage.env'
//       : '.development.env',
//   ),
// });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(Logger3Middleware);
  await app.listen(3000);
}
bootstrap();
