import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  Patch,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, UpdateCatDto } from './dto/dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Post()
  create(@Body() dto: CreateCatDto) {
    return this.catsService.create(dto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.remove(id);
  }
}
