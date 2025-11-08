import { Module } from '@nestjs/common';
import { MediaService } from './services/media.service';
import { MediaController } from './controllers/media.controller';
import { S3Module } from 'nestjs-s3';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    S3Module.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        config: {
          region: configService.get('s3.region'),
          credentials: configService.get('s3.credentials')
        }
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
