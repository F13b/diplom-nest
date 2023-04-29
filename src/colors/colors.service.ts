import { Injectable } from '@nestjs/common';
import {Colors, Prisma} from "@prisma/client";
import {PrismaService} from "../prisma.service";

@Injectable()
export class ColorsService {

  constructor(private readonly prismaService: PrismaService) {}

  createColor(data: Prisma.ColorsCreateInput): Promise<Colors> {
    return this.prismaService.colors.create({data});
  }

  findAll(): Promise<Colors[]> {
    return this.prismaService.colors.findMany({});
  }

  findOne(where: Prisma.ColorsWhereUniqueInput): Promise<Colors> {
    return this.prismaService.colors.findUnique({where});
  }

  updateColor(
      where: Prisma.ColorsWhereUniqueInput,
      data: Prisma.ColorsUpdateInput
  ): Promise<Colors> {
    return this.prismaService.colors.update({where, data});
  }

  deleteColor(where: Prisma.ColorsWhereUniqueInput): Promise<Colors> {
    return this.prismaService.colors.delete({where});
  }
}
