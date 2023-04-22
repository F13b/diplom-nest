import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserService} from "./users/users.service";
import {GendersService} from "./genders/genders.service";
import {PrismaService} from "./prisma.service";
import {UsersModule} from "./users/users.module";
import { TokensModule } from './tokens/tokens.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, TokensModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
