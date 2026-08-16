import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';
import { UpdateApplicationReviewDto } from '../dto/update-application-review.dto';
import { ApplicationReviewService } from '../services/application-review.service';
import { CreateApplicationReviewEmailDto } from '../dto/create-application-review-email.dto';

@UseGuards(AdminGuard)
@Controller('mtym-api/applications/review')
export class ApplicationReviewController {
  constructor(
    private readonly applicationReviewService: ApplicationReviewService,
  ) {}

  @Get(':applicationId')
  async findOne(@Param('applicationId', ParseIntPipe) applicationId: number) {
    const review = await this.applicationReviewService.findOneByApplicationId(
      applicationId,
    );
    if (!review) {
      throw new NotFoundException('Application review does not exist');
    }

    return review;
  }

  @Put(':applicationId')
  update(
    @Param('applicationId', ParseIntPipe) applicationId: number,
    @Body() updateApplicationReviewDto: UpdateApplicationReviewDto,
  ) {
    return this.applicationReviewService.update(
      applicationId,
      updateApplicationReviewDto,
    );
  }

  @Post(':applicationId/emails')
  sendEmail(
    @Param('applicationId', ParseIntPipe) applicationId: number,
    @Body() dto: CreateApplicationReviewEmailDto,
  ) {
    return this.applicationReviewService.storeReviewEmail(applicationId, dto);
  }
}
