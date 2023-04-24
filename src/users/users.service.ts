import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {Prisma, Users} from "@prisma/client";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    /**
     * Функция обращается к объекту Users ORM Prisma и вызывает функцию findUnique, в которую передает объект с парой ключ:значние,
     * где: ключ - поле в таблице пользователя, а значение - содержимое поля
     * @param {Prisma.UsersWhereUniqueInput} userWhere - объект с парой ключ:значение для
     * поиска необходимой записи в таблице пользователя
     */
    async user(
        userWhere: Prisma.UsersWhereUniqueInput
    ): Promise<Users | null> {
        return this.prisma.users.findUnique({
            where: userWhere
        });
    }

    /**
     * Функция обращается к объекту Users ORM Prisma и вызывает функцию findMany, в которую передает
     * объект с настройками выборки записей
     * @param params - объект с настройками выборки
     */
    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UsersWhereUniqueInput;
        where?: Prisma.UsersWhereInput;
        orderBy?: Prisma.UsersOrderByWithRelationInput;
    }): Promise<Users[]> {
        const {
            skip,
            take,
            cursor,
            where,
            orderBy
        } = params;
        return this.prisma.users.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    /**
     * Функция обращается к объекту Users ORM Prisma и вызывает функцию create, в которую передает объект с данными пользователя
     * @param {Prisma.UsersCreateInput} data - объект с данными пользователя
     */
    async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
        const saltRounds: number = 10;
        const hash = await bcrypt.hash(data.password, saltRounds);
        data.password = hash
        return this.prisma.users.create({
           data
        });
    }

    /**
     * Функция обращается к объекту Users ORM Prisma и вызывает функцию update, в которую передает объект с
     * объектом настроек поиска записи в таблице пользователя и объект с данными пользователя
     * @param params - объект с настройками поиска записи пользователя в БД и данными для обновления
     */
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

    /**
     * Функция обращается к объекту Users ORM Prisma и вызывает функцию delete, в которую передает объект с парой ключ:значние,
     * где: ключ - поле в таблице пользователя, а значение - содержимое поля
     * @param {Prisma.UsersWhereUniqueInput} where - объект с парой ключ:значения для поиска необходимой записи в таблице пользователя
     */
    async deleteUser(where: Prisma.UsersWhereUniqueInput): Promise<Users> {
        return this.prisma.users.delete({
            where,
        });
    }
}