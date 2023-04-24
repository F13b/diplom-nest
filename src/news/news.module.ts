import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import {ImagesModule} from "../images/images.module";
import {PrismaService} from "../prisma.service";
import {ImagesService} from "../images/images.service";

@Module({
  imports: [ImagesModule],
  controllers: [NewsController],
  providers: [NewsService, PrismaService, ImagesService]
})
export class NewsModule {}
