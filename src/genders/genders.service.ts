import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {Gender, Prisma, Users} from "@prisma/client";

@Injectable()
export class GendersService {
    constructor(private prisma: PrismaService) {}

    async gender(
        genderWhere: Prisma.GenderWhereUniqueInput
    ): Promise<Gender | null> {
        return this.prisma.gender.findUnique({
            where: genderWhere
        });
    }

    async genders(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.GenderWhereUniqueInput;
        where?: Prisma.GenderWhereInput;
        orderBy?: Prisma.GenderOrderByWithRelationInput;
    }): Promise<Gender[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.gender.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createGender(
        data: Prisma.GenderCreateInput
    ): Promise<Gender> {
        return this.prisma.gender.create({
            data
        })
    }

    async updateGender(params: {
        where: Prisma.GenderWhereUniqueInput;
        data: Prisma.GenderUpdateInput;
    }): Promise<Gender> {
        const { where, data } = params;
        return this.prisma.gender.update({
            data,
            where,
        });
    }

    async deleteGender(
        where: Prisma.GenderWhereUniqueInput
    ): Promise<Gender> {
        return this.prisma.gender.delete({
            where
        })
    }
}