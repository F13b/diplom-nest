import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post('create')
  create() {
    return `cnsj`;
  }

  @Get()
  findAll() {
    return this.carsService.findAll({});
  }

  @Post('test')
  async test(@Body() body) {
      return `${body}`
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne({id: id});
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.carsService.updateCar();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.deleteCar(+id);
  }
}
