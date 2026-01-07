import 'reflect-metadata'; 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_NAME:', process.env.DB_NAME); 
  const app = await NestFactory.create(AppModule);
  console.log('Starting server...');
  const port = process.env.PORT || 3000;
  console.log(`Listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
