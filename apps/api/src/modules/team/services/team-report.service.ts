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
    const team = await this.getEligibleTeam(teamId, userId);
    if (problemNumber < 1 || problemNumber > MTYM_PROBLEM_COUNT) {
      throw new BadRequestException('Invalid problem number');
    }

    const suffix = randomBytes(6).toString('hex');
    const fileUrl = `reports/${team.quadrigram}/intermediate/problem_${problemNumber}_${suffix}.pdf`;
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

  async upsertIntermediateReport(
    teamId: number,
    problemNumber: number,
    fileUrl: string,
    userId: number,
  ) {
    const team = await this.getEligibleTeam(teamId, userId);
    if (problemNumber < 1 || problemNumber > MTYM_PROBLEM_COUNT) {
      throw new BadRequestException('Invalid problem number');
    }
    const expectedPath = `reports/${team.quadrigram}/intermediate/problem_${problemNumber}_`;
    if (!fileUrl.startsWith(expectedPath) || !fileUrl.endsWith('.pdf')) {
      throw new BadRequestException('Invalid report file');
    }

    let report = await this.teamReportRepository.findOne({
      where: {
        team: { id: teamId },
        reportType: TeamReportType.INTERMEDIATE,
        problemNumber,
      },
    });

    if (!report) {
      report = this.teamReportRepository.create({
        team,
        reportType: TeamReportType.INTERMEDIATE,
        problemNumber,
        fileUrl,
      });
    } else {
      report.fileUrl = fileUrl;
    }

    const savedReport = await this.teamReportRepository.save(report);
    const { team: _, ...result } = savedReport;
    return result;
  }
}
