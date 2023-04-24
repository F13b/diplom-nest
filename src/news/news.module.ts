import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import {ImagesModule} from "../images/images.module";
import {PrismaService} from "../prisma.service";

@Module({
  imports: [ImagesModule],
  controllers: [NewsController],
  providers: [NewsService, PrismaService]
})
export class NewsModule {}
