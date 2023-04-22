import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {Prisma, Users} from "@prisma/client";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async user(
        userWhere: Prisma.UsersWhereUniqueInput
    ): Promise<Users | null> {
        return this.prisma.users.findUnique({
            where: userWhere
        });
    }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UsersWhereUniqueInput;
        where?: Prisma.UsersWhereInput;
        orderBy?: Prisma.UsersOrderByWithRelationInput;
    }): Promise<Users[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.users.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
        const saltRounds: number = 10;
        const hash = await bcrypt.hash(data.password, saltRounds);
        data.password = hash
        return this.prisma.users.create({
           data
        });
    }

    async updateUser(params: {
        where: Prisma.UsersWhereUniqueInput;
        data: Prisma.UsersUpdateInput;
    }): Promise<Users> {
        const { where, data } = params;
        return this.prisma.users.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UsersWhereUniqueInput): Promise<Users> {
        return this.prisma.users.delete({
            where,
        });
    }
}