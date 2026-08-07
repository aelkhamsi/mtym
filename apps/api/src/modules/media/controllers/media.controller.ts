import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MediaService } from 'src/modules/media/services/media.service';
import { GetSignedURLDto } from '../dto/get-signed-url.dto';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('mtym-api/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(AuthGuard)
  @Get('preview-url')
  @HttpCode(200)
  async getPreviewUrl(@Query('filename') filename: string) {
    return { 
      url: await this.mediaService.getSignedPreviewURL(filename) 
    };
  }

  @UseGuards(AuthGuard)
  @Post('signed-url')
  @HttpCode(200)
  async getSignedURL(@Req() request: Request, @Body() body: GetSignedURLDto) {
    const userId = request['user'].id;
    const { filename, type, size, checksum } = body;
    const signedURL = await this.mediaService.getSignedPutURL(
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
