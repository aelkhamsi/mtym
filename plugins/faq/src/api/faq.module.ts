import { DynamicModule, Module } from '@nestjs/common';
import { FaqService } from './services/faq.service';
import { FaqController } from './controllers/faq.controller';
import { FaqEntity } from './entities/faq.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class FaqModule {
  static register(): DynamicModule {
    return {
      module: FaqModule,
      imports: [
        TypeOrmModule.forFeature([FaqEntity]),
      ],
      controllers: [FaqController],
      providers: [FaqService],
      exports: [FaqService],
    }
  }
}
