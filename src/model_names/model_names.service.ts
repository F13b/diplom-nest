import { Injectable } from '@nestjs/common';
import {ModelName, Prisma} from "@prisma/client";
import {PrismaService} from "../prisma.service";

@Injectable()
export class ModelNamesService {

  constructor(private readonly prismaService: PrismaService) {}

  createModelName(data: Prisma.ModelNameCreateInput) {
    return this.prismaService.modelName.create({data});
  }

  findAll() {
    return this.prismaService.modelName.findMany({});
  }

  findOne(where: Prisma.ModelNameWhereUniqueInput) {
    return this.prismaService.modelName.findUnique({where});
  }

  updateModelName(
      where: Prisma.ModelNameWhereUniqueInput,
      data: Prisma.ModelNameUpdateInput
  ) {
    return this.prismaService.modelName.update({where, data});
  }

  deleteModelName(where: Prisma.ModelNameWhereUniqueInput) {
    return this.prismaService.modelName.delete({where})
  }
}
