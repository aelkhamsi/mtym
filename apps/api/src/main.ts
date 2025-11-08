import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

dotenv.config({ path: ['.env'] });

async function bootstrap() {
  // const plugins = await fetchPlugins() ?? []
  // const enabledPluginModules = plugins
  //   .filter(plugin => plugin?.isEnabled)
  //   .map(plugin => plugin?.api.module) 
  const enabledPluginModules = []

  const app = await NestFactory.create(AppModule.register(enabledPluginModules));
  const allowedOrigin = [process.env.FRONTEND_URL, process.env.ADMIN_URL];

  app.enableCors({ origin: allowedOrigin, credentials: true });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.API_PORT || 5000);
}
bootstrap();
