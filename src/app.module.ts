import { Module } from '@nestjs/common';
import {UsersModule} from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import {ImagesModule} from "./images/images.module";
import * as path from "path";
import {ServeStaticModule} from "@nestjs/serve-static";
import { OptionsModule } from './options/options.module';
import { ModelNamesModule } from './model_names/model_names.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { ColorsModule } from './colors/colors.module';
import {GendersModule} from "./genders/genders.module";
import {ConfigModule} from "@nestjs/config";
import { RolesModule } from './roles/roles.module';
import { TokensModule } from './tokens/tokens.module';
import { CarsModule } from './cars/cars.module';
import { OrdersModule } from './orders/orders.module';
import { StatusesModule } from './statuses/statuses.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: '.env'
      }),
      ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, '..', 'static'),
      }),
      UsersModule,
      TokensModule,
      AuthModule,
      NewsModule,
      ImagesModule,
      OptionsModule,
      ModelNamesModule,
      EquipmentsModule,
      ColorsModule,
      GendersModule,
      RolesModule,
      CarsModule,
      OrdersModule,
      StatusesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
