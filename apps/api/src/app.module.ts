import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ApplicationModule } from './modules/application/application.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MediaModule } from './modules/media/media.module';
import {
  AppConfig,
  DatabaseConfig,
  JwtConfig,
  S3Config,
  SmtpConfig,
} from './config';
import { AdminUserModule } from './modules/admin-user/admin-user.module';
import { MailModule } from './modules/mail/mail.module';
import { ExcelModule } from './modules/excel/excel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig, JwtConfig, S3Config, SmtpConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('jwt'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AdminUserModule,
    ApplicationModule,
    MediaModule,
    AuthModule,
    MailModule,
    ExcelModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
