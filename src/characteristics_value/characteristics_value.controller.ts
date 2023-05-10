import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharacteristicsValueService } from './characteristics_value.service';

@Controller('characteristics-value')
export class CharacteristicsValueController {
  constructor(private readonly characteristicsValueService: CharacteristicsValueService) {}

  @Post('create')
  create(@Body() data: {
    value: string,
    unit: string,
    characteristicId: number,
    equipmentId: number,
    modelNameId: number
  }) {
    return this.characteristicsValueService.createCharacteristicValue({
      value: data.value,
      unit: data.unit,
      Characteristic: {
        connect: {
          id: data.characteristicId
        }
      },
      Equipment: {
        connect: {
          id: data.equipmentId
        }
      },
      ModelName: {
        connect: {
          id: data.modelNameId
        }
      }
    });
  }

  @Get()
  findAll() {
    return this.characteristicsValueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characteristicsValueService.findOne({id: Number(id)});
  }

  @Patch(':id')
  update(
      @Param('id') id: string,
      @Body() data: {
        value: string,
        unit: string,
        characteristicId: number,
        equipmentId: number,
        modelNameId: number
      }
  ) {
    return this.characteristicsValueService.updateCharacteristicValue(
        {id: Number(id)},
        {
          value: data.value,
          unit: data.unit,
          Characteristic: {
            connect: {
              id: data.characteristicId
            }
          },
          Equipment: {
            connect: {
              id: data.equipmentId
            }
          },
          ModelName: {
            connect: {
              id: data.modelNameId
            }
          }
        }
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characteristicsValueService.deleteCharacteristicValue({id: Number(id)});
  }
}
