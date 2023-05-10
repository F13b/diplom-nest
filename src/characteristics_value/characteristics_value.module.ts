import { Module } from '@nestjs/common';
import { CharacteristicsValueService } from './characteristics_value.service';
import { CharacteristicsValueController } from './characteristics_value.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [CharacteristicsValueController],
  providers: [CharacteristicsValueService, PrismaService]
})
export class CharacteristicsValueModule {}
