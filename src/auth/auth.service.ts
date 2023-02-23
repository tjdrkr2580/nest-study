import { msg } from './../interface/msg';
import { signUpDto, signInDto } from './dto/auth.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadTypes } from './jwt/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

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
      if (err.code === 'P2002') throw new UnauthorizedException();
      return err;
    }
  }

  async signIn(dto: signInDto): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        username: dto.username,
      },
    });
    console.log(user);
    if (!user) throw new Error('아이디나 비밀번호가 틀렸습니다');
    const isPasswordCorrect = await bcrypt.compare(
      dto.password,
      user.hashPassword,
    );
    if (!isPasswordCorrect) throw new Error('아이디나 비밀번호가 틀렸습니다');
    const payload: PayloadTypes = {
      id: user.id,
      username: user.username,
    };
    return { accessToken: this.jwt.sign(payload) };
  }
}
