import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  nodenv: process.env.NODE_ENV,
}));
