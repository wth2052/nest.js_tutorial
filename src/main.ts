//nest.js의 entry point
//파일명 수정하면 안됨, 사전에 약속된 파일이기때문
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
