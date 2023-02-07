import { cat } from './interface/cat.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private readonly cats: cat[] = [];
  create(cat: cat) {
    this.cats.push(cat);
  }
  findAll(): cat[] {
    return this.cats;
  }
}
