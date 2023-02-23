import { msg } from './../interface/msg';
import { signInDto, signUpDto } from './dto/auth.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  3;
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: signUpDto): Promise<msg> {
    return await this.authService.signUp(dto);
  }

  @Post('signin')
  async signin(@Body() dto: signInDto, @Res() res: Response): Promise<any> {
    const jwt = await this.authService.signIn(dto);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.json(jwt.accessToken);
  }
}
