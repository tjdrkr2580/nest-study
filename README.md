# Nest?

Nest는 효율, 확장을 생각한 Node.js의 프레임워크이다.

프로그레시브 자바스크립트, 타입스크립트를 통해서 빌드되고 OOP, FP, FRP 등의 요소를 사용할 수 있게 해준다.

Angular의 아키텍처 사상을 많이 영향을 받음.

## 파일 구조

src - 프로젝트 소스들이 들어가는 폴더

test - 테스트 소스들이 들어가는 폴더

Nest-cli - nest 프로젝트 설정 파일

프로젝트의 시작점은 main.ts이며 그것은 package.json에서 확인해볼 수 있다.

Controller는 사용자의 요청을 받아 응답을 처리하고 Provider는 비즈니스 로직을 처리함.

## Nest의 Module

Root Module을 중심으로 뿌리처럼 모듈을 생성하고 그것을 import 해오는 방식이다.

각 모듈은 Controller와 Provider로 구성되어 있다.

Req -> Controller -> Provider -> Controller -> Res 순으로 작동하게 됨.

## 소스 자동으로 생성하기

```
$ yarn run nest generate module user
$ yarn run nest generate controller user
$ ... service user
```

DI (Dependency Injection) 을 사용을 하는데 이는 스프링에서 사용하는 개념인

서비스가 필요한 시점에 객체를 생성해주는 의미라고 한다.

## 컨트롤러

Controller는 Req를 받아 처리하고 Res의 응답하는 일을 함.

Client의 요청이 들어왔을 때 요청에 따라 Controller에 따라 분기처리 하는 것을 Routing이라고 함.

### @Controller( )

( ) 안에는 라우팅 Path를 지정할 수 있다.

```javascript
@Controller("users")
```

또한 Controller에서는 다음과 같이 HTTP Request Method 데코레이터를 사용할 수 있다.

```javascript
@Get, @Post, @Put, @Delete

import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

@Get() 데코레이터도 @Controller와 마찬가지로 routing path를 지정할 수 있다.

- @Get('profile')

이 경우 사용자의 요청 URL은 다음과 같다.

- http://localhost:/3000/cats/profile

Method 옆에 선언된 type은 response 형식이다.

```
@Get()
findAll(): string
```

## Request 객체

Nest는 Express를 사용하기에 Request. 객체를 사용할 수 있다.

핸들러 Parameter에 @Req( ) 데코레이터를 사용하면 된다.

```javascript
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    console.log(request);
    return 'This action returns all cats';
  }
}
```

## Route Parameters

동적 라우팅을 위해서 리액트 라우터 때와 같게 : [매개변수] 와 함께 사용할 수 있고, 다음은 동적 매개변수를

사용한 예시입니다.

```javascript
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```

만약 id가 1일 경우 호출은 뒤에 cats/1 이런 형식으로 된다.

매개변수는 @Param( ) 데코레이터로 받아서 처리하면 되고, 위에서는 param.id로 params.id로 라우팅 매개변수 값을 추출했다.

```javascript
@Get(':id')
findOne(@Param('id') id: string): string {
  return `This action returns a #${id} cat`;
}
```

이러한 방식으로도 가능하다고 하다.

비동기 함수는 아래 예제와 같이 Promise를 반환해야 합니다.

```javascript
@Get()
async findAll(): Promise<any[]> {
  return [];
}
```

## Post의 body DTO

Post 라우트 핸들러에서는 @Body( ) 데코레이터를 사용할 수 있음.

이때 DTO 스키마 클래스를 생성하여 데이터를 처리할 수 있다.

```javascript
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

해당 DTO를 Controller에서 사용하는 방법은 다음과 같다.

```javascript
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```

일반적인 API의 구조를 모두 포함한 예제는 다음과 같ek.

- findAll : 전체 데이터 목록 조회
- findOne : 데이터 상세 조회
- create : 데이터 생성
- update : 데이터 수정
- remove : 데이터 삭제

```javascript
import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
```

## Service 만들기

- provider는 services, repositories, factories, helpers 등이 있다.
- provider는 종속성에 의해 Inject할 수 있다.
- 즉, provider 객체의 생성 및 연결은 nest runtime 시스템이 위임될 수 있다. [실행 할 때 알아서 함?]
- 컨트롤러는 HTTP 요청을 처리, 복잡한 작업은 Provider에게 위임을 함.
- provider는 module에서 선언하는 일반 자바스크립트 클래스이다.

### Service

```javascript
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

@Injectable( ) 데코레이터는 이 class가 Nest IoC 컨테이너에서 관리되는 class임을 선언하는 것.

> IoC(Inversion of Control) : 객체를 관리, 생성을 책이미고 의존성을 관리하는 컨테이너, 개발자가 해야하는 일을 프로그램이 대신하게 만들어주는 것

```javascript
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

Controller에서 catService가 constructor를 통해 주입이 된다, 여기서 private를 사용하면 선언과 초기화가 동시에 이루어진다.



## 미들웨어 (Middleware)

> 애플리케이션에서 공통 처리 담당

미들웨어는 라우터 핸들러 이전에 호출되는 함수이다.

클라이언트의 요청을 라우터 핸들러가 받기 전에 가로채 다른 작업을 처리할 수 있다.



- 모든 코드가 공통으로 실행해야 하는 인증, 로깅들을 처리할 수 있다.
- 요청과 응답 객체를 변경할 수 있다.
- 요청의 validation을 체크하여 오류 처리를 할 수 있다.

> validation - 현재 상태나 입력값을 확인하고, 검증하는 것



### 미들웨어 사용법

1. @Injectable 데코레이터 사용
2. NestMiddleware 인터페이스를 implements해서 사용함.
3. Module class 내부에 configure를 사용하여 선언, 이때 NestModule 인터페이스를 implements 함. 

------

logger.middleware.ts

```js
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```

app.module.ts

```js
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
```

라우트를 특정하여 사용할 수도 있음.

```js
.forRoutes({ path: 'cats', method: RequestMethod.GET });
```



### Middleware 관리를 위한 모듈 - MiddlewareConsumer

MiddlewareConsumer이라는 헬퍼클래스를 사용하면 여러 스타일로 미들웨어를 설정할 수 있음.

forRoutes( ) 메소드는 단일 문자열, 여러 문자열, RouteInfo 객체, 컨트롤러 클래스 및 여러 컨트롤러

클래스를 사용할 수 있다, 다음은 Controller의 사용 예시다.

```js
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller.ts';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CatsController);
  }
}
```

apply 메서드는 여러 미들웨어를 지정할 수 있다.



#### 라우트 예외처리

exclude( ) 메소드로 라우트를 제외할 수 있다.

```js
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST },
    'cats/(.*)',
  )
  .forRoutes(CatsController);
```



#### 함수형 미들웨어

지금까지 만든 클래스 미들웨어는 간단한 함수형 미들웨어로 변경할 수 있다.

logger.middleware.ts

```js
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};
```

위의 logger 함수는 Module에서 다음과 같이 사용할 수 있습니다.

app.module.ts

```js
consumer
  .apply(logger)
  .forRoutes(CatsController);
```



**여러개 미들웨어 사용**

apply( ) 메서드에 여러 개의 미들웨어를 사용할 수 있다.

```js
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```



#### **Global 미들웨어**

모든 경로에서 사용하는 미들웨어는 INestApplication 인스턴스에서 제공하는 user() 메서드를 사용할 수 있습니다.

```js
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

- 단, Global 미들웨어에서 DI 컨테이너에 액세스할 수 없다.
- app.use()에서 미들웨어를 사용할 때는 대신 함수형 미들웨어를 사용한다.

> DI가 안되기 때문에 클래스로 만들어진 미들웨어가 사용이 안되기에, 함수형 미들웨어로 받아준다.

## TypeORM은 건너뛸 것이다. | Prisma를 사용.



## ConfigModule?

응용 프로그램은 종종 다른 환경에서 실행해야 하고 환경에 따라 다른 구성 설정을 사용해야 함.

dotenv(환경변수)를 내부적으로 활용할 수 있도록 도와준다.

```javascript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    CatsModule,
    PrismaModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
}

```

이런 식으로 ConfigModule을 imports에 넣어준다.

forRoot 안에 작성할 수 있는 인자들 중 몇개만 정리해보았다.

```javascript
export interface ConfigModuleOptions {
    /**
    true 몇 env 개체 값이 메모리에 캐시가 됨.
     */
    cache?: boolean;
    /**
    만약 true일 경우에 ConfigModule을 글로벌 모듈로 등록한다.
     */
    isGlobal?: boolean;
    /**
     true면 env가 무시된다.
     */
    ignoreEnvFile?: boolean;
    /**
     true먄 미리 정의된 환경 변수의 유효성이 검사되지 않는다.
     */
    ignoreEnvVars?: boolean;
    /**
    	로드할 환경 파일의 경로
     */
    envFilePath?: string | string[];
    /**
     * 환경 파일 인코딩
     */
}

```

**isGlobal? : boolean**

Global을 등록하지 않으면 해당 모듈을 사용하는 곳에서 import를 받아야 하지만,

Global로 등록을 하게 될 경우, provider들을 import 하지 않고 Injection 받아 사용할 수 있다고 한다.



**ignoreEnvFile? : boolean**

해당 flag 값이 true가 될 경우 env의 값들을 읽어오지 않는다.



**envFilePath**? : string | string[ ]

단독으로 지정할 수 있으며, 배열로도 지정할 수 있는데 배열로 지정할 경우 순서대로 탐색하며

가정 먼저 발견되는 .env 파일을 로드하게 된다.

[자세한 내용](https://velog.io/@dev_leewoooo/NestJs-Config)



ConfigModule를 만들고, 설정을 하고 난 후 prismaService에서 이용할 것이기 때문에

```javascript
import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  OnModuleInit,
  INestApplication,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // constructor(private readonly config: ConfigService) {
  //   super({
  //     datasources: {
  //       db: config.get('DATABASE_URL'),
  //     },
  //   });
  // }
  async onModuleInit() {
    this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

```

prisma.service.ts의 코드는 이런 식으로 구성이 될 것 같다.

근데 datasources 쪽 코드를 아직도 이해를 못하겠다.

다른 방법도 있는 것 같기도 하고.. 이 부분 코드를 [참고](https://blog.logrocket.com/how-to-use-nestjs-prisma/)를 해봐도 좋을 것 같다, Example들이 너무 다 달라서..

위에 작성되어 있는 enableShutdownHooks은 종료 신호를 수신하고 종료 후크가 실행되기 전

신호에 다른 리스너가 있는 경우 현재 프로세스를 죽이지 않는 설정을 해준다고 한다. <의미를 잘..>

그리고 이를 적용하려면 main.ts에 설정을 추가로 해주어야 한다고 함.











