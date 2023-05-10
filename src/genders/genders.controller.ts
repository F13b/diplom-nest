import {Controller, Get} from "@nestjs/common";
import {GendersService} from "./genders.service";
import {Gender} from "@prisma/client";

@Controller('genders')
export class GendersController {
    constructor(private readonly gendersService: GendersService) {}

    @Get()
    getAll(): Promise<Gender[]> {
        return this.gendersService.genders({});
    }
}