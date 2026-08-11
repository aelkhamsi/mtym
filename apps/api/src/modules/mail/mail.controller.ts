import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';
import { MailService } from './mail.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('mtym-api/email')
export class EmailController {
  constructor(
    private readonly mailService: MailService,
  ) {}

  @UseGuards(AdminGuard)
  @Post('')
  @HttpCode(200)
  async findByUserId(@Body() sendEmailDto: SendEmailDto) {
    const { email, subject, content } = sendEmailDto
    await this.mailService.sendCustomEmail(email, subject, content)
    return { success: true }
  }
}
