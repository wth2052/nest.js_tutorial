import { Injectable } from '@nestjs/common';

//동적으로 DI 주입

//서비스는 리포지토리를 반드시 의존해야 하며 이는 생성자를 통한 DI로 해결
//@Injectable() = 나를 필요로하면 언제든지 DI를 통해서 나를 써
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
