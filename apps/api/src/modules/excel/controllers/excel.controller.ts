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
import { Roles } from 'src/decorators/roles.decorator';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role } from 'src/guards/role.enum';

@Controller('mtym-api/excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('applications')
  @Header('Content-Type', 'text/xlsx')
  async downloadApplications(@Res() res: Response) {
    const file = await this.excelService.downloadApplications();
    if (!file) {
      return new BadRequestException();
    }

    res.download(`${file}`);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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
