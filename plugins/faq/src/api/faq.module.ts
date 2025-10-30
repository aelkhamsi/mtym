import { DynamicModule, Module } from '@nestjs/common';
import { FaqService } from './services/faq.service';
import { FaqController } from './controllers/faq.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqEntity } from './entities/faq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FaqEntity])],
  controllers: [FaqController],
  providers: [FaqService],
  exports: [FaqService],
})
export class FaqModule {}
