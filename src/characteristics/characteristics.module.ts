import { Module } from '@nestjs/common';
import { CharacteristicsService } from './characteristics.service';
import { CharacteristicsController } from './characteristics.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [CharacteristicsController],
  providers: [CharacteristicsService, PrismaService]
})
export class CharacteristicsModule {}
