import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {PrismaService} from "../prisma.service";
import {UserService} from "../users/users.service";
import {TokensModule} from "../tokens/tokens.module";
import {TokensService} from "../tokens/tokens.service";

@Module({
  imports: [TokensModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, TokensService],
})
export class AuthModule {}
