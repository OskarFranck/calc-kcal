import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
const NEST_PORT: any = process.env.NEST_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(NEST_PORT);
}
bootstrap();
