import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {TokensService} from "../tokens/tokens.service";
import {UserService} from "../users/users.service";
import {Users} from "@prisma/client";
import {Token} from "../tokens/entities/token.entity";

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
            if(candidate.password == password) {
                const tokens: Token = await this.tokenService.generateTokens({
                    id: candidate.id,
                    roleId: candidate.roleId,
                    name: candidate.name,
                    lastname: candidate.lastname,
                    phone: candidate.phone,
                    birth: String(candidate.birth)
                });

                console.log(tokens)
            }
        }
    }
}
