import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000

  const corsOptions = {
    origin: ['http://localhost:5174'],
    methods:'GET,POST,PUT,DELETE',
    credentials:true
  }

  app.enableCors(corsOptions)
  await app.listen(PORT);
}
bootstrap();
