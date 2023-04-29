import { Module } from '@nestjs/common';
import {UsersModule} from "./users/users.module";
import { TokensModule } from './tokens/tokens.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import {ImagesModule} from "./images/images.module";
import * as path from "path";
import {ServeStaticModule} from "@nestjs/serve-static";
import { OptionsModule } from './options/options.module';
import { OptionValuesModule } from './option_values/option_values.module';
import { ModelNamesModule } from './model_names/model_names.module';

@Module({
  imports: [
      UsersModule,
      TokensModule,
      AuthModule,
      NewsModule,
      ImagesModule,
      ServeStaticModule.forRoot({
        rootPath: path.resolve(__dirname, 'static'),
      }),
      OptionsModule,
      OptionValuesModule,
      ModelNamesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
