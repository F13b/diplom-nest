import { Injectable } from '@nestjs/common';
import {Prisma, Roles} from "@prisma/client";
import {PrismaService} from "../prisma.service";

@Injectable()
export class RolesService {

  constructor(private readonly prismaService: PrismaService) {}

  createRole(data: Prisma.RolesCreateInput): Promise<Roles> {
    return this.prismaService.roles.create({data});
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RolesWhereUniqueInput;
    where?: Prisma.RolesWhereInput;
    orderBy?: Prisma.RolesOrderByWithRelationInput;
  }): Promise<Roles[]> {
    const {
      skip,
      take,
      cursor,
      where,
      orderBy
    } = params;
    return this.prismaService.roles.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(where: Prisma.RolesWhereUniqueInput): Promise<Roles> {
    return this.prismaService.roles.findUnique({where});
  }

  deleteRole(where: Prisma.RolesWhereUniqueInput): Promise<Roles> {
    return this.prismaService.roles.delete({where})
  }
}
