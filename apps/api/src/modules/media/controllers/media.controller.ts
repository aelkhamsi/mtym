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
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/guards/role.enum';

@Controller('mtym-api/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get('preview-url')
  @HttpCode(200)
  async getPreviewUrl(@Query('filename') filename: string) {
    return { 
      url: await this.mediaService.getSignedPreviewURL(filename) 
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
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
