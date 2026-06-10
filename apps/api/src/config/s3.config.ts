import { registerAs } from '@nestjs/config';

export default registerAs('s3', () => ({
  name: process.env.MINIO_BUCKET_NAME,
  endpoint: process.env.MINIO_ENDPOINT,
  region: process.env.MINIO_REGION ?? 'us-east-1',
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.MINIO_ROOT_USER,
    secretAccessKey: process.env.MINIO_ROOT_PASSWORD,
  },
}));
