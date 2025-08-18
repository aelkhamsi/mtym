import { BadRequestException, Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import { ApplicationService } from 'src/modules/application/services/application.service';
import * as tmp from 'tmp';
import { ConfigService } from '@nestjs/config';
import { rowFactory as applicationRowFactory } from '../config/applications.excel';
import { styleSheet as styleApplicationsSheet } from '../config/style.excel';
import { columns as applicationColumns } from '../config/columns.excel';
@Injectable()
export class ExcelService {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly configService: ConfigService,
  ) {}

  async downloadApplications() {
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet('applications');

    // colums
    sheet.columns = applicationColumns;

    // rows
    const rows = [];
    const result = await this.applicationService.findAll();
    const applications = applicationRowFactory(result, this.configService);
    applications.forEach((application: any) => {
      rows.push(Object.values(application));
    });
    sheet.addRows(rows);

    // style
    styleApplicationsSheet(sheet);

    const file = await new Promise((resolve) => {
      tmp.file(
        {
          discardDescriptor: true,
          prefix: 'applications',
          postfix: '.xlsx',
          mode: parseInt('0600', 8),
        },
        async (err, file) => {
          if (err) throw new BadRequestException(err);

          workbook.xlsx
            .writeFile(file)
            .then((_) => {
              resolve(file);
            })
            .catch((err) => {
              throw new BadRequestException(err);
            });
        },
      );
    });

    return file;
  }
}
