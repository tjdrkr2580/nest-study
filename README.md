# Nest Auth



> 다음은 로그인, 회원가입, CRUD에 대해 구현을 해보면서 필기하는 마크다운 파일이다.



## Class-validator?

데코레이터를 통하여 데이터를 검증할 수 있는 라이브러리이다.

- 유효성 검사
- 보내준 데이터가 제대로 온 것인지 검증해야 함



[참조 - class-validator 사용법](https://velog.io/@doohyunlm/TypeScript-class-validator-%EC%82%AC%EC%9A%A9%EB%B2%95)

```typescript
@IsString() 문자열인지 검증

@IsInt() Int값인지에 대한 검증

@IsBoolean() Boolean값인지에 대한 검증

@IsEmail() 이메일 형식인지에 대한 검증

@IsArray() 배열 값인지에 대한 검증

@IsEnum() Enum값인지에 대한 검증

@IsNumber() 숫자값인지에 대한 검증(소숫점도 검증 가능)

@IsDate() 날짜값인지에 대한 검증

@IsBase64() Base64 값인지에 대한 검증(토큰 처리를 Base64로 했을시 사용)

@IsOptional() 값이 들어오지 않으면 검증을 안해도 된다는 데코레이터

@MaxLength() 최대 길이 제한

@MinLength() 최소 길이 제한

@Length() 길이 제한

@Matches(RegExp('^[가-힣a-zA-Z0-9]*$'), {message : "입력 값을 다시 확인하세요"}) 정규표현식 입력 값을 검증할 떄 사용 

@Min() 최솟값

@Max() 최댓값
```

이후 main.ts에서 한줄로 간편하게 적용할 수 있다.

```typescript
  app.use(
    new ValidationPipe({
      whitelist: true,
    }),
  );
```

만약에 dto에서 허용되지 않은 속성이 들어오게 될 경우 그 속성은 제거되고, DTO에서

사용할 수 없게 된다, 이 동작을 가능케 하는게 `whitelist : true`이다.



## Cors

다른 도메인에서도 리소스를 호출하기 위해 꼭 필요한 작업이다.

```typescript
app.enableCors({
	origin: true, || ['http://localhost:3000' ...] // true면 아무나 접근이 가능하도록 허용한다. 배포단계에서는 url을 적어서 하나의 도메인에서만 백엔드 애플리케이션에 접근할 수 있도록 한다.
    credentials: true, // 신뢰가능한 것인지 체크해준다.
})
```



그래서 위와 같은 설정들을 모두 적용하고 나면 위와 같은 코드가 된다.

```typescript
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000'],
  });
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();

```



## SignUp

우선 필기를 하기 전에 에러 핸들링과, return 메세지의 표준 등 아는 지식이 존재하지 않아

내 마음대로 진행했다는 의사를 표현하고 싶다.

```ts
import { msg } from './../interface/msg';
import { signUpDto } from './dto/auth.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(dto: signUpDto): Promise<msg> {
    const hashPassword = await bcrypt.hash(dto.password, 10);
    try {
      await this.prisma.user.create({
        data: {
          name: dto.name,
          username: dto.username,
          hashPassword,
        },
      });
      return { msg: 'okay' };
    } catch (err) {
      if (err.code === 'P2002')
        return { msg: '동일한 아이디를 사용한 계정이 존재합니다.' };
      return err;
    }
  }
}

```

비밀번호를 그냥 저장하면 안되니, bcrypt를 통해서 암호화를 시켜 데이터베이스에

저장할 수 있도록 조치하였다. 그리고 만약 아이디가 Unique한데 같은 아이디를 `Create`하려는

시도가 생겼을 경우 Prisma에서 P2002를 반환하길래 이를 한글 메세지로 return 시켜주었다.

만약 그 오류가 아닐 경우에는 그냥 err가 return 되도록 작성 하였다.



## Signin

```typescript
  async signIn(dto: signInDto): Promise<msg> {
    const user = await this.prisma.user.findFirst({
      where: {
        username: dto.username,
      },
    });
    if (!user) throw new Error('아이디나 비밀번호가 틀렸습니다');
    const isPasswordCorrect = await bcrypt.compare(
      dto.password,
      user.hashPassword,
    );
    if (!isPasswordCorrect) throw new Error('아이디나 비밀번호가 틀렸습니다');
    return { msg: 'login Success' };
  }
```





