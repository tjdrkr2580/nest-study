import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class todoDto {
  @IsString()
  title: string;

  @IsOptional()
  description?: string;

  @IsBoolean()
  isDone: boolean;
}
