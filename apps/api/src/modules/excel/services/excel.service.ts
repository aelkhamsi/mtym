import * as tmp from 'tmp';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import { ConfigService } from '@nestjs/config';
import { ApplicationService } from 'src/modules/application/services/application.service';
import { ParticipantDetailsService } from 'src/modules/participant-details/participant-details.service';
import { UserService } from 'src/modules/user/services/user.service';
import { applicationsColumns, participantDetailsColumns } from '../config/columns.excel';
import { applicationsRowFactory, participantDetailsRowFactory } from '../config/rows.excel';
import { styleApplicationsSheet, styleParticipantDetailsSheet } from '../config/style.excel';

@Injectable()
export class ExcelService {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly participantDetailsService: ParticipantDetailsService,
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async downloadApplications(payloadToken: string) {
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet('applications');

    // colums
    sheet.columns = applicationsColumns;

    // rows
    const rows = [];
    const result = await this.applicationService.findAll();
    const adminNames = await this.getPayloadAdminNames(payloadToken);
    const applications = applicationsRowFactory(
      result,
      this.configService,
      adminNames,
    );
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

  private async getPayloadAdminNames(payloadToken: string) {
    const frontendUrl = this.configService.get<string>('app.frontendUrl');
    if (!frontendUrl) {
      throw new BadRequestException('Payload URL is not configured');
    }

    const names = new Map<string, string>();
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await fetch(
        `${frontendUrl.replace(/\/$/, '')}/api/users?limit=100&page=${page}`,
        { headers: { Authorization: `JWT ${payloadToken}` } },
      );
      if (!response.ok) {
        throw new BadRequestException('Could not load Payload admins');
      }

      const result = await response.json();
      for (const admin of result.docs ?? []) {
        const name = [admin.firstName, admin.lastName]
          .filter(Boolean)
          .join(' ');
        names.set(String(admin.id), name || 'Unnamed admin');
      }

      hasNextPage = Boolean(result.hasNextPage);
      page = result.nextPage;
    }

    return names;
  }

  async downloadParticipantDetails() {
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet('participant-details');

    // colums
    sheet.columns = participantDetailsColumns;

    // rows
    const rows = [];
    const result = await this.participantDetailsService.findAll();
    const users = (await this.usersService.findAll()).map(user => ({id: user?.id, firstName: user?.firstName, lastName: user?.lastName}));
    const participantDetails = participantDetailsRowFactory(result, users, this.configService);
    participantDetails.forEach((details: any) => {
      rows.push(Object.values(details));
    });
    sheet.addRows(rows);

    // style
    styleParticipantDetailsSheet(sheet);    

    const file = await new Promise((resolve) => {
      tmp.file(
        {
          discardDescriptor: true,
          prefix: 'participant-details',
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
