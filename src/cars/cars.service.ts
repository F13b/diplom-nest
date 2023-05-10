import { Injectable } from '@nestjs/common';
import {Prisma} from "@prisma/client";
import {PrismaService} from "../prisma.service";

@Injectable()
export class CarsService {

  constructor(private readonly prismaService: PrismaService) {}

  createCar(data: Prisma.CarCreateInput) {
    return this.prismaService.car.create({data});
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
        Equipment: {
          select: {
            id: true,
            name: true
          },
        },
        ModelName: {
          select: {
            id: true,
            name: true
          }
        },
        colors: {
          select: {
            color: {
              select: {
                id: true,
                name: true,
                code: true
              }
            }
          }
        }
      }
    });
  }

  findOne(where: Prisma.CarWhereUniqueInput) {
    return this.prismaService.car.findUnique({where});
  }

  updateCar() {
    return `This action updates a`;
  }

  deleteCar(id: number) {
    return `This action removes a #${id} car`;
  }
}
