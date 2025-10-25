import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Plugin } from './modules/plugin/entities/plugin.entity';

dotenv.config({ path: ['.env'] });

async function fetchPlugins() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [Plugin],
  })
  await dataSource.initialize()
  const pluginRepository = dataSource.getRepository(Plugin)
  const plugins = pluginRepository?.find() 
  return plugins
}

async function bootstrap() {
  const plugins = await fetchPlugins()
  const app = await NestFactory.create(AppModule.register(plugins));
  const allowedOrigin = [process.env.FRONTEND_URL, 'http://localhost:3000', 'http://localhost:3001'];

  app.enableCors({ origin: allowedOrigin, credentials: true });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.API_PORT || 5000);
}
bootstrap();
