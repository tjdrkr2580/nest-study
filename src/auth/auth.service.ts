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
