import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OptionsService } from './options.service';
import {Option} from "@prisma/client";

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post('create')
  create(@Body() data: {
    name: string
  }): Promise<Option> {
    return this.optionsService.createOption(data);
  }

  @Get()
  findAll(): Promise<Option[]> {
    return this.optionsService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Option> {
    return this.optionsService.findOne({id: Number(id)});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: {name: string}) {
    return this.optionsService.updateOption({id: Number(id)}, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionsService.deleteOption({id: Number(id)});
  }
}
