import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async sendResetPasswordEmail(user: User, accessToken: string) {
    const link =
      this.configService.get('app.nodenv') === 'production'
        ? `https://mtym.mathmaroc.org/reset-password?token=${accessToken}`
        : `http://localhost:3000/reset-password?token=${accessToken}`;

    await this.mailerService.sendMail({
      to: user?.email,
      subject: 'MTYM - Réinitialiser votre mot de passe',
      template: 'reset-password',
      context: { firstName: user?.firstName, link },
    });
  }

  async sendEmailVerificationEmail(user: User, verificationCode: string) {
    await this.mailerService.sendMail({
      to: user?.email,
      subject: 'MTYM - Vérification de votre e-mail',
      template: 'email-verification',
      context: { firstName: user?.firstName, verificationCode },
    });
  }
}
