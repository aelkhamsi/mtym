import { Injectable } from '@nestjs/common';
import { CreatePluginDto } from './dto/create-plugin.dto';
import { UpdatePluginDto } from './dto/update-plugin.dto';
import { Plugin } from './entities/plugin.entity';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class PluginService {
  constructor(
    @InjectRepository(Plugin) private pluginRepository: Repository<Plugin>,
  ) {}

  create(createPluginDto: CreatePluginDto) {
    const faqEntry = this.pluginRepository.create(createPluginDto)
    this.pluginRepository.save(faqEntry)
    return faqEntry
  }

  findAll() {
    return this.pluginRepository.find()
  }

  findOne(id: string) {
    return this.pluginRepository.findOneBy({ id })
  }

  update(id: string, updatePluginDto: UpdatePluginDto) {
    return this.pluginRepository.update({ id }, updatePluginDto)
  }

  remove(id: string) {
    return this.pluginRepository.delete({ id })
  }
}
