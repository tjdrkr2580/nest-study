import { IsString } from 'class-validator';
export class signInDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class signUpDto {
  @IsString()
  name: string;
  @IsString()
  username: string;
  @IsString()
  password: string;
}
