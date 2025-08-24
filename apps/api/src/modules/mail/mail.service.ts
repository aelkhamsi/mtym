import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  async sendResetPasswordEmail(user: User, token: string) {
    const link =
      this.configService.get('NODE_ENV') === 'production'
        ? `https://mtym.mathmaroc.org/reset-password?token=${token}`
        : `http://localhost:3000/reset-password?token=${token}`;

    const url = this.configService.get('SMTP_ENDPOINT') + 'send';
    const payload = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        templateName: 'reset-password',
        recipient: user?.email,
        firstName: user?.firstName,
        link,
      }),
    };

    await fetch(url, payload);
  }

  async sendEmailVerificationEmail(user: User, verificationCode: string) {
    const url = this.configService.get('SMTP_ENDPOINT') + 'send';
    const payload = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        templateName: 'email-verification',
        recipient: user?.email,
        firstName: user?.firstName,
        verificationCode,
      }),
    };

    await fetch(url, payload);
  }
}
