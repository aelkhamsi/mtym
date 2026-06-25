import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/modules/user/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailer: MailerService,
  ) {}

  async sendResetPasswordEmail(user: User, accessToken: string) {
    const isProduction = this.configService.get('app.nodenv') === 'production';
    const link = isProduction
      ? `https://mtym.mathmaroc.org/reset-password?token=${accessToken}`
      : `http://localhost:3000/reset-password?token=${accessToken}`;

    await this.mailer.sendMail({
      to: user.email,
      subject: 'Reset your password',
      template: 'reset-password',
      context: {
        firstName: user.firstName,
        link,
      },
    });
  }

  async sendEmailVerificationEmail(user: User, verificationCode: string) {
    await this.mailer.sendMail({
      to: user.email,
      subject: 'Verify your email',
      template: 'email-verification',
      context: {
        firstName: user.firstName,
        verificationCode,
      },
    });
  }
}
