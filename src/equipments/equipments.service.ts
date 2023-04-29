import { Injectable } from '@nestjs/common';
import {Equipment, Prisma} from "@prisma/client";
import {PrismaService} from "../prisma.service";

@Injectable()
export class EquipmentsService {

  constructor(private readonly prismaService: PrismaService) {}

  createEquipment(data: Prisma.EquipmentCreateInput): Promise<Equipment> {
    return this.prismaService.equipment.create({data});
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EquipmentWhereUniqueInput;
    where?: Prisma.EquipmentWhereInput;
    orderBy?: Prisma.EquipmentOrderByWithRelationInput;
  }): Promise<Equipment[]> {
    const {
      skip,
      take,
      cursor,
      where,
      orderBy
    } = params;
    return this.prismaService.equipment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(where: Prisma.EquipmentWhereUniqueInput): Promise<Equipment> {
    return this.prismaService.equipment.findUnique({where});
  }

  update(
      where: Prisma.EquipmentWhereUniqueInput,
      data: Prisma.EquipmentUpdateInput
  ): Promise<Equipment> {
    return this.prismaService.equipment.update({where, data});
  }

  deleteEquipment(where: Prisma.EquipmentWhereUniqueInput): Promise<Equipment> {
    return this.prismaService.equipment.delete({where});
  }
}
