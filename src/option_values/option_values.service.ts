import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Option_value, Prisma} from "@prisma/client";

@Injectable()
export class OptionValuesService {

  constructor(private readonly prismaService: PrismaService) {}

  createValue (data: Prisma.Option_valueCreateInput): Promise<Option_value> {
    return this.prismaService.option_value.create({data});
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UsersWhereUniqueInput;
    where?: Prisma.UsersWhereInput;
    orderBy?: Prisma.UsersOrderByWithRelationInput;
  }): Promise<Option_value[]> {
    const {
      skip,
      take,
      cursor,
      where,
      orderBy
    } = params;
    return this.prismaService.option_value.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(where: Prisma.Option_valueWhereUniqueInput): Promise<Option_value> {
    return this.prismaService.option_value.findUnique({where});
  }

  updateValue(
        where: Prisma.Option_valueWhereUniqueInput,
        data: Prisma.Option_valueCreateInput
      ): Promise<Option_value> {
    return this.prismaService.option_value.update({where, data});
  }

  deleteValue(where: Prisma.Option_valueWhereUniqueInput): Promise<Option_value> {
    return this.prismaService.option_value.delete({where});
  }
}
