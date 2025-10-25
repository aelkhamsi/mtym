import { DynamicModule, Module } from '@nestjs/common';
import { PluginService } from './plugin.service';
import { PluginController } from './plugin.controller';
import { Plugin } from './entities/plugin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class PluginModule {
  static register(plugins: Plugin[]): DynamicModule {
    console.log('plugins', plugins)

    return {
      module: PluginModule,
      imports: [TypeOrmModule.forFeature([Plugin])],
      controllers: [PluginController],
      providers: [PluginService],
    }
  }
}
