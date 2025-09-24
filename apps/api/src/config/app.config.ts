import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodenv: process.env.NODE_ENV,
  frontendUrl: process.env.FRONTEND_URL,
}));
