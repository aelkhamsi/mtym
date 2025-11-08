import { registerAs } from '@nestjs/config';

export default registerAs('s3', () => ({
  name: process.env.AWS_BUCKET_NAME,
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
}));
