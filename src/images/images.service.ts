import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class ImagesService {
    constructor(private prisma: PrismaService) {}

    async add(data: Prisma.ImageCreateInput) {
        return this.prisma.image.create({data});
    }
}