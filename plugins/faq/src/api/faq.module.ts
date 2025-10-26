import { Module } from '@nestjs/common';
import { FaqService } from './services/faq.service';
import { FaqController } from './controllers/faq.controller';

@Module({
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
