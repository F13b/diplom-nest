import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile} from '@nestjs/common';
import { NewsService } from './news.service';
import {Image, News} from "@prisma/client";
import {ImagesService} from "../images/images.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('news')
export class NewsController {
  constructor(
      private readonly newsService: NewsService,
      private imageService: ImagesService
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

  @Post('create')
  @UseInterceptors(FileInterceptor('banner'))
  async test(@UploadedFile() file): Promise<Image> {
    return this.imageService.addImage(file);
  }
}
