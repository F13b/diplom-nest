import { Injectable } from '@nestjs/common';
import {Characteristic_value, Prisma} from "@prisma/client";
import {PrismaService} from "../prisma.service";

@Injectable()
export class CharacteristicsValueService {

  constructor(private readonly prismaService: PrismaService) {}

  createCharacteristicValue(data: Prisma.Characteristic_valueCreateInput): Promise<Characteristic_value> {
    return this.prismaService.characteristic_value.create({data});
  }

  findAll(): Promise<Characteristic_value[]> {
    return this.prismaService.characteristic_value.findMany({});
  }

  findOne(where: Prisma.Characteristic_valueWhereUniqueInput): Promise<Characteristic_value> {
    return this.prismaService.characteristic_value.findUnique({where});
  }

  updateCharacteristicValue(
      where: Prisma.Characteristic_valueWhereUniqueInput,
      data: Prisma.Characteristic_valueUpdateInput
  ): Promise<Characteristic_value> {
    return this.prismaService.characteristic_value.update({where, data});
  }

  deleteCharacteristicValue(where: Prisma.Characteristic_valueWhereUniqueInput): Promise<Characteristic_value> {
    return this.prismaService.characteristic_value.delete({where});
  }
}
