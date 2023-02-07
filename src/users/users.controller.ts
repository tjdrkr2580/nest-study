import {
  Body,
  Controller,
  Post,
  Query,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() createCatDto: any) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: any) {
    return `this action returns all cats (limit : ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return `this action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param(':id') id: string) {
    return 'this Action removes a cat';
  }
}
