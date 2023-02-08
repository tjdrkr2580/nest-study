import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class todoDto {
  @IsString()
  title: string;

  @IsOptional()
  description?: string;

  @IsBoolean()
  isDone: boolean;
}

export class updateDto {
  @IsString()
  title: string;

  @IsOptional()
  description?: string;

  @IsBoolean()
  isDone: boolean;
}
