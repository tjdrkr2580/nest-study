import { msg } from './../interface/msg';
import { signUpDto } from './dto/auth.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  createTask(@Body() dto: signUpDto): Promise<msg> {
    return this.authService.signUp(dto);
  }
}
