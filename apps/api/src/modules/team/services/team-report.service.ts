import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MTYM_PROBLEM_COUNT,
  MTYM_REPORT_MAX_FILE_SIZE,
} from '@mdm/shared';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { MediaService } from 'src/modules/media/services/media.service';
import { Team, TeamStatus } from '../entities/team.entity';
import { TeamReport, TeamReportType } from '../entities/team-report.entity';

@Injectable()
export class TeamReportService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(TeamReport)
    private readonly teamReportRepository: Repository<TeamReport>,
    private readonly mediaService: MediaService,
  ) {}

  private async getEligibleTeam(
    teamId: number,
    userId: number,
  ) {
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
      relations: { leader: true },
    });
    if (!team) {
      throw new NotFoundException('The team does not exist');
    }
    if (team.leader?.id !== userId) {
      throw new ForbiddenException('Only the team leader can upload reports');
    }
    if (![TeamStatus.NEW, TeamStatus.APPROVED].includes(team.status)) {
      throw new ForbiddenException(
        'Reports are not available for this team status',
      );
    }
    return team;
  }

  async getIntermediateReportUploadUrl(
    teamId: number,
    problemNumber: number,
    size: number,
    checksum: string,
    userId: number,
  ) {
    await this.getEligibleTeam(teamId, userId);
    if (problemNumber < 1 || problemNumber > MTYM_PROBLEM_COUNT) {
      throw new BadRequestException('Invalid problem number');
    }

    const suffix = randomBytes(6).toString('hex');
    const fileUrl = `reports/${teamId}/intermediate/problem_${problemNumber}_${suffix}.pdf`;
    const url = await this.mediaService.getSignedPutURL(
      userId,
      fileUrl,
      'application/pdf',
      size,
      checksum,
      MTYM_REPORT_MAX_FILE_SIZE,
    );
    if (!url) {
      throw new BadRequestException('Invalid report file');
    }

    return { url, fileUrl };
  }

  async upsertIntermediateReports(
    teamId: number,
    reports: Array<{ problemNumber: number; fileUrl: string }>,
    userId: number,
  ) {
    const team = await this.getEligibleTeam(teamId, userId);
    const problemNumbers = Array.from(
      { length: MTYM_PROBLEM_COUNT },
      (_, index) => index + 1,
    );
    if (
      reports.length !== MTYM_PROBLEM_COUNT ||
      !problemNumbers.every((problemNumber) =>
        reports.some(
          (report) =>
            report.problemNumber === problemNumber && report.fileUrl,
        ),
      )
    ) {
      throw new BadRequestException('A report is required for every problem');
    }

    const savedReports = [];

    for (const reportInput of reports) {
      let report = await this.teamReportRepository.findOne({
        where: {
          team: { id: teamId },
          reportType: TeamReportType.INTERMEDIATE,
          problemNumber: reportInput.problemNumber,
        },
      });

      if (!report) {
        report = this.teamReportRepository.create({
          team,
          reportType: TeamReportType.INTERMEDIATE,
          problemNumber: reportInput.problemNumber,
          fileUrl: reportInput.fileUrl,
        });
      } else {
        report.fileUrl = reportInput.fileUrl;
      }

      const savedReport = await this.teamReportRepository.save(report);
      const { team: _, ...result } = savedReport;
      savedReports.push(result);
    }

    return savedReports;
  }
}
