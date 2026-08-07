import { registerAs } from '@nestjs/config';

export default registerAs('payload', () => ({
  secret: process.env.PAYLOAD_SECRET, 
}));
