import { msg } from './../interface/msg';
import { signUpDto } from './dto/auth.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(dto: signUpDto): Promise<msg> {
    await this.prisma.user.create({
      data: {
        ...dto,
      },
    });
    return { msg: 'okay' };
  }
}
