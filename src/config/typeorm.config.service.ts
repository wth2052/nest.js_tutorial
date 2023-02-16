import { Injectable } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Article } from "../board/article.entity";

@Injectable() //service에선 필쑤 DI 해야하니까
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {

  }

    createTypeOrmOptions(): TypeOrmModuleOptions {
      return {
        //db 설정에 관한 내용을 적는것
        type: "mysql",
        host: this.configService.get<string>("DATABASE_HOST"),
        port: this.configService.get<number>("DATABASE_PORT"),
        username: this.configService.get<string>("DATABASE_USERNAME"),
        password: this.configService.get<string>("DATABASE_PASSWORD"),
        database: this.configService.get<string>("DATABASE_NAME"),
        entities: [Article],
        synchronize: true, //개발 버전에서는 스키마의 용이한 수정을 위해 overwrite를 할건지?
      }
    }

}