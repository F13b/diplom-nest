import { Injectable } from '@nestjs/common';
import {Payload} from "./entities/payload.entity";
import {PrismaService} from "../prisma.service";
import {Token} from "./entities/token.entity";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class TokensService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async generateTokens(payload: Payload): Promise<Token> {
        const accessToken: string = await this.jwtService.signAsync(payload);
        const refreshToken: string = await this.jwtService.signAsync(payload);

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        const dbToken = this.prisma.token.findUnique({where: {userId: userId}});
        console.log(dbToken)
    }
}
