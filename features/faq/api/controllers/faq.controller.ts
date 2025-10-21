import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FaqService } from 'api/services/faq.service';
import { CreateFaqDto } from 'api/dto/create-faq.dto';
import { UpdateFaqDto } from 'api/dto/update-faq.dto';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Get()
  findAll() {
    return this.faqService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.faqService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(+id, updateFaqDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.faqService.remove(+id);
  }
}
