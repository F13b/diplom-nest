import { Module } from '@nestjs/common';
import { OptionValuesService } from './option_values.service';
import { OptionValuesController } from './option_values.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [OptionValuesController],
  providers: [OptionValuesService, PrismaService]
})
export class OptionValuesModule {}
