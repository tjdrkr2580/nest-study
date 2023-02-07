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
