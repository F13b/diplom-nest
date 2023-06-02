import { Injectable } from '@nestjs/common';
import {Prisma} from "@prisma/client";
import {PrismaService} from "../prisma.service";

@Injectable()
export class StatusesService {
  constructor(private readonly prismaService: PrismaService) {}
  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StatusWhereUniqueInput;
    where?: Prisma.StatusWhereInput;
    orderBy?: Prisma.StatusOrderByWithRelationInput;
  }) {
    const {
      skip,
      take,
      cursor,
      where,
      orderBy
    } = params;
    return this.prismaService.status.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
