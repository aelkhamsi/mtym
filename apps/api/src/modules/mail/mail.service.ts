import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendResetPasswordEmail(user: User, token: string) {
    const link =
      this.configService.get('NODE_ENV') === 'production'
        ? `https://mmc.mathmaroc.org/reset-password?token=${token}`
        : `http://localhost:3000/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'MMC | Reset your password',
      template: './reset-password',
      context: {
        firstName: user.firstName,
        link,
      },
    });
  }

  async sendEmailVerificationEmail(user: User, verificationCode: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'MMC | Email verification',
      template: './email-verification',
      context: {
        firstName: user.firstName,
        verificationCode,
      },
    });
  }
}
