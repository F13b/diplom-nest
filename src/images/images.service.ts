import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {Image, Prisma} from "@prisma/client";

@Injectable()
export class ImagesService {
    constructor(private prisma: PrismaService) {}

    async add(data: Prisma.ImageCreateInput): Promise<Image> {
        return this.prisma.image.create({data});
    }

    async update(params: {
        where: Prisma.ImageWhereUniqueInput,
        data: Prisma.ImageUpdateInput
    }): Promise<Image> {
        const {where, data} = params;
        return this.prisma.image.update({
            where,
            data
        });
    }

    async delete(where: Prisma.ImageWhereUniqueInput): Promise<Image> {
        return this.prisma.image.delete({where});
    }
}