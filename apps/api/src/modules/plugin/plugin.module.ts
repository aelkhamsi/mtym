import { Module, DynamicModule } from '@nestjs/common';
import { PluginService } from './plugin.service';
import { PluginController } from './plugin.controller';
import { Plugin } from './entities/plugin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class PluginModule {
  static register(pluginModules: DynamicModule[]): DynamicModule {
    return {
      module: PluginModule,
      imports: [
        TypeOrmModule.forFeature([Plugin]),
        ...pluginModules
      ],
      exports: [
        ...pluginModules,
      ],
      controllers: [PluginController],
      providers: [PluginService],
    }
  }
}
