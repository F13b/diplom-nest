import { Injectable } from '@nestjs/common';
import {Image, Prisma} from "@prisma/client";
import {PrismaService} from "../prisma.service";
import {CreateCarDto} from "./dto/create-car.dto";
import {ModelNamesService} from "../model_names/model_names.service";
import {UpdateCarDto} from "./dto/update-car.dto";

@Injectable()
export class CarsService {

  constructor(private readonly prismaService: PrismaService) {}

  async createCar(data: CreateCarDto, image: Image) {
      return this.prismaService.car.create({
        data: {
          modelName: { connectOrCreate: { where: {name: data.modelName}, create: {name: data.modelName} } },
          price: data.price,
          equipment: { connect: { id: Number(data.equipment) } },
          transmission: data.transmission,
          numberOfGears: data.numberOfGears,
          typeOfDrive: data.typeOfDrive,
          clearance: data.clearance,
          fuelTankVolume: data.fuelTankVolume,
          trunkVolume: data.trunkVolume,
          length: data.length,
          width: data.width,
          height: data.height,
          payload: data.payload,
          maxSpeed: data.maxSpeed,
          accelerationUp: data.accelerationUp,
          fuelConsumption: data.fuelConsumption,
          banner: {
            connect: {
              id: image.id
            }
          }
        }
      })
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CarWhereUniqueInput;
    where?: Prisma.CarWhereInput;
    orderBy?: Prisma.CarOrderByWithRelationInput;
  }) {
    const {
      skip,
      take,
      cursor,
      where,
      orderBy
    } = params;
    return this.prismaService.car.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        modelName: true,
        equipment: true,
        banner: true
      }
    });
  }

  findOne(where: Prisma.CarWhereUniqueInput) {
    return this.prismaService.car.findUnique({
      where,
      include: {
        modelName: true,
        equipment: true,
        banner: true
      }
    });
  }

  updateCar(where: Prisma.CarWhereUniqueInput, data: UpdateCarDto, image: Image) {
    return this.prismaService.car.update({
      where,
      data: {
        modelName: { connectOrCreate: { where: {name: data.modelName}, create: {name: data.modelName} } },
        price: data.price,
        equipment: { connect: { id: data.equipment } },
        transmission: data.transmission,
        numberOfGears: data.numberOfGears,
        typeOfDrive: data.typeOfDrive,
        clearance: data.clearance,
        fuelTankVolume: data.fuelTankVolume,
        trunkVolume: data.trunkVolume,
        length: data.length,
        width: data.width,
        height: data.height,
        payload: data.payload,
        maxSpeed: data.maxSpeed,
        accelerationUp: data.accelerationUp,
        fuelConsumption: data.fuelConsumption,
        banner: {
          connect: {
            id: image.id
          }
        }
      }
    });
  }

  deleteCar(where: Prisma.CarWhereUniqueInput) {
    return this.prismaService.car.delete({where});
  }
}
