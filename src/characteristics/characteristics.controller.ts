import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharacteristicsService } from './characteristics.service';

@Controller('characteristics')
export class CharacteristicsController {
  constructor(private readonly characteristicsService: CharacteristicsService) {}

  @Post('create')
  create(@Body() data: {name: string}) {
    return this.characteristicsService.createCharacteristic({name: data.name});
  }

  @Get()
  findAll() {
    return this.characteristicsService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characteristicsService.findOne({id: Number(id)});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: {name: string}) {
    return this.characteristicsService.updateCharacteristic({id: Number(id)}, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characteristicsService.deleteCharacteristic({id: Number(id)});
  }
}
