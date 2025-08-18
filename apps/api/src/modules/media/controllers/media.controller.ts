import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
} from '@nestjs/common';
import { MediaService } from 'src/modules/media/services/media.service';
import { GetSignedURLDto } from '../dto/get-signed-url.dto';

@Controller('mtym-api/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('signed-url')
  @HttpCode(200)
  async getSignedURL(@Req() request: Request, @Body() body: GetSignedURLDto) {
    const userId = request['user'].id;
    const { filename, type, size, checksum } = body;
    const signedURL = await this.mediaService.getSignedURL(
      userId,
      filename,
      type,
      size,
      checksum,
    );

    if (!signedURL) {
      throw new BadRequestException();
    }

    return {
      url: signedURL,
      statusCode: 200,
    };
  }
}
