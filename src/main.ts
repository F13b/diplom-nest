import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {PrismaService} from "./prisma.service";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // swagger settings
  const config = new DocumentBuilder()
      .setTitle('Jetour-prototype API')
      .setDescription('The Jetour-prototype API description')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
