import {Module} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {GendersService} from "./genders.service";
import {GendersController} from "./genders.controller";

@Module({
    controllers: [GendersController],
    providers: [GendersService, PrismaService]
})
export class GendersModule {}