import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {TokensService} from "../tokens/tokens.service";
import {UserService} from "../users/users.service";
import {Users, Token as PrismaToken} from "@prisma/client";
import * as bcrypt from "bcrypt";
import {Payload} from "../tokens/entitites/payload.entity";
import {Token} from "../tokens/entitites/token.entity";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private tokenService: TokensService,
        private usersService: UserService
    ) {}

    async signIn(email: string, password: string) {
        const candidate: Users = await this.usersService.user({email: email});
        if (candidate != null) {
            const isMatch: boolean = await bcrypt.compare(password, candidate.password);
            if (isMatch) {
                const payload: Payload = {
                    id: candidate.id,
                    roleId: candidate.roleId,
                    email: candidate.email,
                    name: candidate.name,
                    lastname: candidate.lastname,
                    phone: candidate.phone,
                    birth: String(candidate.birth),
                    genderId: candidate.genderId
                }

                const tokens: Token = await this.tokenService.generateTokens(payload);
                await this.tokenService.saveToken(candidate.id, tokens.refreshToken);

                return {...tokens, payload};
            } else {
                console.log('error')
            }
        }
    }

    async logout(refreshToken: string): Promise<void> {
        await this.tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken: string) {
        if (refreshToken == null) {
            console.log('не авторизован');
        }

        const userData: Payload = await this.tokenService.validateRefreshToken(refreshToken);
        const dbToken: PrismaToken = await this.tokenService.findToken({
            refreshToken: refreshToken
        });
        if (!userData || !dbToken) {
            console.log('не авторизован');
        }

        const user: Users = await this.prisma.users.findUnique({where: {id: userData.id}});
        const payload: Payload = {
            id: user.id,
            roleId: user.roleId,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            phone: user.phone,
            birth: String(user.birth),
            genderId: user.genderId
        }

        const tokens = await this.tokenService.generateTokens(payload);
        await this.tokenService.saveToken(payload.id, tokens.refreshToken);

        return {...tokens, payload}
    }
}
