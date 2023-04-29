import { Module } from '@nestjs/common';
import { ModelNamesService } from './model_names.service';
import { ModelNamesController } from './model_names.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [ModelNamesController],
  providers: [ModelNamesService, PrismaService]
})
export class ModelNamesModule {}
