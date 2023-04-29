import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModelNamesService } from './model_names.service';
import {ModelName} from "@prisma/client";

@Controller('model-names')
export class ModelNamesController {
  constructor(private readonly modelNamesService: ModelNamesService) {}

  @Post('create')
  async create(
      @Body() data: {
        name: string
      }
  ) {
    return this.modelNamesService.createModelName({name: data.name});
  }
}
