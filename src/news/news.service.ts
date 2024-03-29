import { Injectable } from '@nestjs/common';
import {News, Prisma} from "@prisma/client";
import {PrismaService} from "../prisma.service";

@Injectable()
export class NewsService {

  constructor(private prisma: PrismaService) {}

  async createNews(data: Prisma.NewsCreateInput): Promise<News> {
      return this.prisma.news.create({data});
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NewsWhereUniqueInput;
    where?: Prisma.NewsWhereInput;
    orderBy?: Prisma.NewsOrderByWithRelationInput;
  }): Promise<News[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.news.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
        include: {
          Image: {
              select: {
                  path: true
              }
          }
        }
    });
  }

  async findOne(where: Prisma.NewsWhereUniqueInput): Promise<News | null> {
      return this.prisma.news.findUnique({
          where: where,
          include: {
              Image: {
                  select: {
                      path: true
                  }
              }
          } 
      });
  }

  async updateNews(params: {
      where: Prisma.NewsWhereUniqueInput,
      data: Prisma.NewsUpdateInput
  }): Promise<News> {
      const {where, data} = params;
      return this.prisma.news.update({
          where,
          data
      })
  }

  async deleteNews(where: Prisma.NewsWhereUniqueInput): Promise<void> {
    await this.prisma.news.delete({where});
  }
}
