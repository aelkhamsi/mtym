import { registerAs } from '@nestjs/config';

export default registerAs('s3', () => ({
  name: process.env.S3_BUCKET_NAME,
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION ?? 'us-east-1',
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
}));
