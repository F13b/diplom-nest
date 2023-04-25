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
  async getOneNews(@Param('id') id: string): Promise<News> {
      return this.newsService.findOne({id: id});
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('banner'))
  async create(@UploadedFile() file, @Body() newsData: {
    title: string,
    description: string
  }): Promise<News> {
    const image: Image = await this.imageService.addImage(file);
    return this.newsService.createNews({
      title: newsData.title,
      description: newsData.description,
      Image: {
        connect: {
          id: image.id
        }
      }
    });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('banner'))
  async update(
      @Param('id') id: string,
      @UploadedFile() file,
      @Body() newsData: {
        title: string,
        description: string
      }
  ): Promise<News> {
    const image: Image = await this.imageService.addImage(file);
    return this.newsService.updateNews({
      where: {
        id: id
      },
      data: {
        title: newsData.title,
        description: newsData.description,
        Image: {
          connect: {
            id: image.id
          }
        }
      }
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
     await this.newsService.deleteNews({id: id});
  }
}
