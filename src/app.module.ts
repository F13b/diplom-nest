import { Module } from '@nestjs/common';
import {UsersModule} from "./users/users.module";
import { TokensModule } from './tokens/tokens.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import {ImagesModule} from "./images/images.module";

@Module({
  imports: [UsersModule, TokensModule, AuthModule, NewsModule, ImagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
