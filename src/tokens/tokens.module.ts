import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import {JwtModule} from "@nestjs/jwt";
import {PrismaService} from "../prisma.service";

@Module({
  imports: [
      JwtModule.register({
        global: true,
        secret: "secret"
      })
  ],
  providers: [TokensService, PrismaService]
})
export class TokensModule {}
