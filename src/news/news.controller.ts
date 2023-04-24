import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import {News} from "@prisma/client";

@Controller('news')
export class NewsController {
  constructor(
      private readonly newsService: NewsService
  ) {}

  @Get()
  async getNews(): Promise<News[]> {
      return this.newsService.findAll({});
  }

  @Get(':id')
  async getOneNews(@Param(':id') id: string): Promise<News> {
      return this.newsService.findOne({id: id});
  }

  @Delete(':id')
  async delete(@Param() id: string) {
    return this.newsService.remove({id: id});
  }
}
