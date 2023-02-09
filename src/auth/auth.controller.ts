import { msg } from './../interface/msg';
import { signInDto, signUpDto } from './dto/auth.dto';
import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: signUpDto): Promise<msg> {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  signin(@Body() dto: signInDto): Promise<any> {
    return this.authService.signIn(dto);
  }
}
