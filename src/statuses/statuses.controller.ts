import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusesService } from './statuses.service';

@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get()
  findAll() {
    return this.statusesService.findAll({});
  }
}
