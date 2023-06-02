import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}
  create(data: Prisma.OrderCreateInput) {
    return this.prismaService.order.create({data});
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }) {
    const {
      skip,
      take,
      cursor,
      where,
      orderBy
    } = params;
    return this.prismaService.order.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        Users: true,
        Status: true,
        Car: {
          include: {
            modelName: true,
            equipment: true
          }
        }
      }
    });
  }

  findOne(where: Prisma.OrderWhereUniqueInput) {
    return this.prismaService.order.findUnique({where});
  }

  update(where: Prisma.OrderWhereUniqueInput, data: Prisma.OrderUpdateInput) {
    return this.prismaService.order.update({where, data});
  }

  remove(where: Prisma.OrderWhereUniqueInput) {
    return this.prismaService.order.delete({where});
  }
}
