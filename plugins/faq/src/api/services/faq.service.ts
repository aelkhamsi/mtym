import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { UpdateFaqDto } from '../dto/update-faq.dto';
import { FaqEntity } from '../entities/faq.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(FaqEntity) private faqRepository: Repository<FaqEntity>,
  ) {}

  create(createFaqDto: CreateFaqDto) {
    const faqEntry = this.faqRepository.create(createFaqDto)
    this.faqRepository.save(faqEntry)
    return faqEntry
  }

  findAll() {
    return this.faqRepository.find()
  }

  findOne(id: number) {
    return this.faqRepository.findOneBy({ id })
  }

  update(id: number, updateFaqDto: UpdateFaqDto) {
    return this.faqRepository.update({ id }, updateFaqDto)
  }

  remove(id: number) {
    return this.faqRepository.delete({ id })
  }
}
