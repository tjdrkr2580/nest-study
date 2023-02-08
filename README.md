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







