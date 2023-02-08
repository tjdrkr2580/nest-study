import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class signInDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  username: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}

export class signUpDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  username: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
