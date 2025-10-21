import { Module } from '@nestjs/common';
import { FaqService } from 'api/services/faq.service';
import { FaqController } from 'api/controllers/faq.controller';

@Module({
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
