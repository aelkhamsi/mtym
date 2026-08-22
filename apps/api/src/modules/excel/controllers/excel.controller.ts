import {
  BadRequestException,
  Controller,
  Get,
  Header,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ExcelService } from '../services/excel.service';
import { Request, Response } from 'express';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';

@Controller('mtym-api/excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @UseGuards(AdminGuard)
  @Get('applications')
  @Header('Content-Type', 'text/xlsx')
  async downloadApplications(@Req() req: Request, @Res() res: Response) {
    const file = await this.excelService.downloadApplications(
      req.cookies?.['payload-token'] ?? '',
    );
    if (!file) {
      return new BadRequestException();
    }

    res.download(`${file}`);
  }

  @UseGuards(AdminGuard)
  @Get('participant-details')
  @Header('Content-Type', 'text/xlsx')
  async downloadParticipantDetails(@Res() res: Response) {
    const file = await this.excelService.downloadParticipantDetails();
    if (!file) {
      return new BadRequestException();
    }

    res.download(`${file}`);
  }
}
