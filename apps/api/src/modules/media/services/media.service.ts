import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectS3, S3 } from 'nestjs-s3';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class MediaService {
  constructor(
    @InjectS3() private readonly s3: S3,
    private readonly configService: ConfigService,
  ) {}

  acceptedTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'application/pdf',
  ];

  maxFileSize = 1024 * 1024 * 3; // 3MB

  async getSignedPutURL(
    userId: number,
    filename: string,
    type: string,
    size: number,
    checksum: string,
  ) {
    if (!this.acceptedTypes.includes(type)) {
      return null;
    }

    if (size > this.maxFileSize) {
      return null;
    }

    const putObjectCommand = new PutObjectCommand({
      Bucket: this.configService.get('s3.name'),
      Key: filename,
      ContentType: type,
      ContentLength: size,
      ChecksumSHA256: checksum,
      Metadata: { userId: `${userId}` },
    });

    const signedURL = await getSignedUrl(this.s3, putObjectCommand, {
      expiresIn: 60,
    });

    return signedURL;
  }

  async getSignedPreviewURL(
    filename: string,
    expiresIn = 60
  ) {
    const previewObjectCommand = new GetObjectCommand({
      Bucket: this.configService.get('s3.name'),
      Key: filename,
    })
    
    return getSignedUrl(this.s3, previewObjectCommand, { expiresIn: expiresIn });
  }
}
