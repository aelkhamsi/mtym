import { DynamicModule, Module, Type } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ApplicationModule } from './modules/application/application.module';
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
import { TeamModule } from './modules/team/team.module';
import { PluginModule } from './modules/plugin/plugin.module';

@Module({})
export class AppModule {
  static register(pluginModules) {
    return {
      module: AppModule,
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
            autoLoadEntities: true,
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
        TeamModule,
        PluginModule.register(pluginModules)
      ],
    }
  }
}
