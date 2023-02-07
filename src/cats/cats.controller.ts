import { CreateCatDto, UpdateCatDto } from './dto/dto';
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll() {
    return `this action returns all cats`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `this action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param(':id') id: string) {
    return `this Action removes ${id} cat`;
  }
}
