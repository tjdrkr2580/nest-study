import { Cat } from './interface/cat.interface';
import { PrismaService } from './../prisma/prisma.service';
import { CreateCatDto, UpdateCatDto } from './dto/dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateCatDto): Promise<Cat> {
    const task = await this.prisma.cat.create({
      data: {
        name: dto.name,
        age: dto.age,
        breed: dto.breed,
      },
    });
    return task;
  }
  async findAll(): Promise<Cat[]> {
    return await this.prisma.cat.findMany({});
  }

  async update(id: number, dto: UpdateCatDto): Promise<Cat> {
    return await this.prisma.cat.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async findOne(id: number): Promise<Cat> {
    return await this.prisma.cat.findFirst({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<Cat> {
    return await this.prisma.cat.delete({
      where: {
        id,
      },
    });
  }
}
