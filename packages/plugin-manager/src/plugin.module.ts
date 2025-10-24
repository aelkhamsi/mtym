import { Module } from '@nestjs/common';
import { PluginService } from './plugin.service';
import { PluginController } from './plugin.controller';

@Module({
  controllers: [PluginController],
  providers: [PluginService],
})
export class PluginModule {}
