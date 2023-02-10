//nest.js의 entry point
//파일명 수정하면 안됨, 사전에 약속된 파일이기때문
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //클라이언트로부터 오는 데이터가 유효하지 않다? -> 400 에러 내줌
  //데이터 타입 transform을 자동으로 해줌

  app.useGlobalPipes(new ValidationPipe({transform : true}));
  await app.listen(3000);
}
bootstrap();
