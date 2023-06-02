import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import {PrismaService} from "../prisma.service";
import {ImagesService} from "../images/images.service";

@Module({
  controllers: [CarsController],
  providers: [CarsService, PrismaService, ImagesService]
})
export class CarsModule {}
