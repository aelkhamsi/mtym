import { DynamicModule, Module } from '@nestjs/common';
import { FaqService } from './services/faq.service';
import { FaqController } from './controllers/faq.controller';

@Module({})
export class FaqModule {
  static register(): DynamicModule {
    return {
      module: FaqModule,
      controllers: [FaqController],
      providers: [FaqService],
      exports: [FaqService],
    }
  }
}
