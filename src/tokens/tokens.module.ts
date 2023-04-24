import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import {PrismaService} from "../prisma.service";
import {JwtModule, JwtService} from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "secret",
    }),
  ],
  controllers: [],
  providers: [TokensService, PrismaService, JwtService]
})
export class TokensModule {}
