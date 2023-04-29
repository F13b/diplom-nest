import { Injectable } from '@nestjs/common';
import {Characteristic, Prisma} from "@prisma/client";
import {PrismaService} from "../prisma.service";

@Injectable()
export class CharacteristicsService {

  constructor(private readonly prismaService: PrismaService) {}

  createCharacteristic(data: Prisma.CharacteristicCreateInput): Promise<Characteristic> {
    return this.prismaService.characteristic.create({data});
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CharacteristicWhereUniqueInput;
    where?: Prisma.CharacteristicWhereInput;
    orderBy?: Prisma.CharacteristicOrderByWithRelationInput;
  }): Promise<Characteristic[]> {
    const {
      skip,
      take,
      cursor,
      where,
      orderBy
    } = params;
    return this.prismaService.characteristic.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(where: Prisma.CharacteristicWhereUniqueInput): Promise<Characteristic> {
    return this.prismaService.characteristic.findUnique({where});
  }

  updateCharacteristic(
      where: Prisma.CharacteristicWhereUniqueInput,
      data: Prisma.CharacteristicUpdateInput
  ): Promise<Characteristic> {
    return this.prismaService.characteristic.update({where, data});
  }

  deleteCharacteristic(where: Prisma.CharacteristicWhereUniqueInput): Promise<Characteristic> {
    return this.prismaService.characteristic.delete({where});
  }
}
