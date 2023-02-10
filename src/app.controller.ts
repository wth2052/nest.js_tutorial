import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // 컨트롤러의 역할을 수행하겠다.
export class AppController {
  //의존성주입 DI
  //DI는 이런 IoC를 수행하는 방법의 하나이며 Nest.js에서는 생성자를 통한 DI를 가장 기본적인 IoC 테크닉으로 생각하고 있음
  //IoC는 Inversion of Control의 준말로서 제어 역전
  // IoC는 개발자가 사용하고 싶은 객체를 직접 생성하는 것이 아니라
  //객체의 생명주기 관리 자체를 외부(여기서는 Nest.js IoC 컨테이너)에 위임
  // IoC 컨테이너라는 친구는 @Injectable 혹은 @InjectRepository 와 같은
  // 데코레이터가 달린 클래스를 트래킹하여 실제로 Nest.js 웹 어플리케이션이 실행될 때 동적으로 DI를 함
  //SOLID 원칙의 DIP(의존 역전 원칙)
  constructor(private readonly appService: AppService) {}

  //HTTP GET으로 요청받음, GET PUT DELETE POST 등 다 가능
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
