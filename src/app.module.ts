import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { TypeormConfigService } from "./config/typeorm.config.service";
import { ConfigModule } from "@nestjs/config";

//@ = 데코레이터
// 해당 클래스나 함수가 어떤 역할을 수행하는지 nest.js에게 알려줌
//= metadata
//exports도 있음
@Module({
  //서비스를 exports 한다던가, http모듈 등..
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    //하드코딩도 OK, forRoot
    //서비스로 넘김, 동적구성을 허용 Async를 지정안하면 타이밍 못맞출수도 있음
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
      }),
    BoardModule
  ],
  //컨트롤러 정의
  controllers: [AppController],
  //해당 모듈에 대한 서비스 정의
  providers: [AppService],
})
export class AppModule {}
