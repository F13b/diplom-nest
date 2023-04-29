import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColorsService } from './colors.service';
import {Colors} from "@prisma/client";

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post('create')
  create(@Body() data: {
    name: string,
    code: string
  }): Promise<Colors> {
    return this.colorsService.createColor({
      name: data.name,
      code: data.code
    });
  }

  @Get()
  findAll(): Promise<Colors[]> {
    return this.colorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Colors> {
    return this.colorsService.findOne({id: Number(id)});
  }

  @Patch(':id')
  update(
      @Param('id') id: string,
      @Body() data: {
        name: string,
        code: string
      }
  ): Promise<Colors> {
    return this.colorsService.updateColor(
        {id: Number(id)},
        {
          name: data.name,
          code: data.code
        }
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Colors> {
    return this.colorsService.deleteColor({id: Number(id)});
  }
}
