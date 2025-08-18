import { registerAs } from '@nestjs/config';

export default registerAs('s3', () => ({
  config: {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_BUCKET_REGION,
  },
}));
