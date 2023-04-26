import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Option, Prisma} from "@prisma/client";

@Injectable()
export class OptionsService {

  constructor(private readonly prismaService: PrismaService) {}

  async createOption(data: Prisma.OptionCreateInput): Promise<Option> {
    return this.prismaService.option.create({data});
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UsersWhereUniqueInput;
    where?: Prisma.UsersWhereInput;
    orderBy?: Prisma.UsersOrderByWithRelationInput;
  }): Promise<Option[]> {
    const {
      skip,
      take,
      cursor,
      where,
      orderBy
    } = params;
    return this.prismaService.option.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(where: Prisma.OptionWhereUniqueInput): Promise<Option> {
    return this.prismaService.option.findUnique({where});
  }

  updateOption(
      where: Prisma.OptionWhereUniqueInput,
      data: Prisma.OptionUpdateInput
  ): Promise<Option> {
    return this.prismaService.option.update({where, data})
  }

  deleteOption(where: Prisma.OptionWhereUniqueInput): Promise<Option> {
    return this.prismaService.option.delete({where});
  }
}
