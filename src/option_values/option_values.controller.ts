import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OptionValuesService } from './option_values.service';
import {Option_value} from "@prisma/client";

@Controller('option-values')
export class OptionValuesController {
  constructor(private readonly optionValuesService: OptionValuesService) {}

  @Post('create')
  create(@Body() data: {
    isBasic: boolean,
    equipmentId: number,
    optionId: number,
    modelNameId: number
  }): Promise<Option_value> {
    return this.optionValuesService.createValue({
      isBasic: data.isBasic,
      Equipment: {
        connect: {
          id: data.equipmentId
        }
      },
      Option: {
        connect: {
          id: data.optionId
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
  findAll(): Promise<Option_value[]> {
    return this.optionValuesService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Option_value> {
    return this.optionValuesService.findOne({id: Number(id)});
  }

  @Patch(':id')
  update(
      @Param('id') id: string,
      @Body() data: {
        isBasic: boolean,
        equipmentId: number,
        optionId: number,
        modelNameId: number
      }
  ): Promise<Option_value> {
    return this.optionValuesService.updateValue(
        {id: Number(id)},
        {
          isBasic: data.isBasic,
          Equipment: {
            connect: {
              id: data.equipmentId
            }
          },
          Option: {
            connect: {
              id: data.optionId
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
  remove(@Param('id') id: string): Promise<Option_value> {
    return this.optionValuesService.deleteValue({id: Number(id)});
  }
}
