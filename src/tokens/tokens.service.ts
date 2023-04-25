import { Injectable } from '@nestjs/common';
import {Payload} from "./entities/payload.entity";
import {PrismaService} from "../prisma.service";
import {Token} from "./entities/token.entity";
import {JwtService} from "@nestjs/jwt";
import {Prisma, Token as PrismaToken} from "@prisma/client";

@Injectable()
export class TokensService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    /**
     * Функция принимает объект с данными пользователя и генерирует токены доступа и обновления
     * @param {Payload} payload - объект с данными пользователя
     */
    async generateTokens(payload: Payload): Promise<Token> {
        const accessToken: string = await this.jwtService.signAsync(payload, {expiresIn: '1h'});
        const refreshToken: string = await this.jwtService.signAsync(payload, {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    }

    /**
     * Функция проверяет, есть ли в БД токен пользователя, если токен в БД находится, вызывается функция update и
     * токен обновления заменяется новым, если токена пользователя в базе данных нет - он записывается в БД
     * @param userId - уникальный идентификатор пользователя
     * @param refreshToken - токен обновления
     */
    async saveToken(userId: number, refreshToken: string): Promise<PrismaToken> {
        const dbToken: PrismaToken = await this.prisma.token.findUnique({where: {userId: userId}});

        if (dbToken != null) {
            return this.prisma.token.update({
                where: {
                    userId: userId
                },
                data: {
                    refreshToken: refreshToken
                }
            })
        }

        const token: PrismaToken = await this.prisma.token.create({
            data: {
                userId: userId,
                refreshToken: refreshToken
            }
        });

        return token;
    }

    /**
     * Функция удаляет из базы данных токен пользователя
     * @param {string} userToken - токен пользователя
     */
    async removeToken(userToken: string): Promise<void> {
        const token = await this.findToken({refreshToken: userToken});
        await this.prisma.token.delete({
            where: {id: token.id}
        })
    }

    /**
     * Функция осуществляет поиск указанного токена в базе данных
     * @param {Prisma.TokenWhereUniqueInput} where - объект с парой ключ:значения для поиска необходимой записи в таблице токенов
     */
    async findToken(where: Prisma.TokenWhereInput): Promise<PrismaToken | null> {
        const token: PrismaToken = await this.prisma.token.findFirst({where});
        return token;
    }

    /**
     * Функция производит проверку токена с помощью функции verifyAsync и возвращает данные из токена или null
     * @param {string} token - токен доступа
     */
    async validateAccessToken(token: string): Promise<Payload | null> {
        try {
            return await this.jwtService.verifyAsync(token);
        } catch (e) {
            return null
        }
    }

    /**
     * Функция производит проверку токена с помощью функции verifyAsync и возвращает данные из токена или null
     * @param {string} token - токен обновления
     */
    async validateRefreshToken(token: string): Promise<Payload | null> {
        try {
            return await this.jwtService.verifyAsync(token);
        } catch (e) {
            return null
        }
    }
}
