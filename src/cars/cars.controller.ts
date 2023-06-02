import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile} from '@nestjs/common';
import { CarsService } from './cars.service';
import {CreateCarDto} from "./dto/create-car.dto";
import {UpdateCarDto} from "./dto/update-car.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {Image} from "@prisma/client";
import {ImagesService} from "../images/images.service";

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService, private readonly imageService: ImagesService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('banner'))
  async create(@Body() params: CreateCarDto, @UploadedFile() file) {
    const image: Image = await this.imageService.addImage(file);
    return this.carsService.createCar(params, image);
  }

  @Get()
  findAll() {
    return this.carsService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne({id: Number(id)});
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() params: UpdateCarDto, @UploadedFile() file) {
    console.log(params);
    const image: Image = await this.imageService.addImage(file);
    return this.carsService.updateCar({id: Number(id)}, params, image);
  }  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.deleteCar({id: Number(id)});
  }
}
