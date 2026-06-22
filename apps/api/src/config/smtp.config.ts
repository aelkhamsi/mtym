import { registerAs } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export default registerAs('smtp', () => ({
  endpoint: process.env.SMTP_ENDPOINT,
  transport: {
    host: 'smtp.purelymail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
  defaults: {
    from: `"MTYM" <${process.env.SMTP_USER}>`,
  },
  template: {
    dir: join(__dirname, '../modules/mail/templates/'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
}));
