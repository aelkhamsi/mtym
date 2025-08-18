import {
  BadRequestException,
  Controller,
  Get,
  Header,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ExcelService } from '../services/excel.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { ADMIN_ROLE } from 'src/constants';
import { Roles } from 'src/decorators/roles.decorator';
import { Response } from 'express';

@Controller('mtym-api/excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get('applications')
  @Header('Content-Type', 'text/xlsx')
  @UseGuards(RolesGuard)
  @Roles(ADMIN_ROLE)
  async downloadApplications(@Res() res: Response) {
    const file = await this.excelService.downloadApplications();
    if (!file) {
      return new BadRequestException();
    }

    res.download(`${file}`);
  }
}
